'use client';
import React, { useState, useEffect } from 'react';
import { Col, Row, Form, FormProps } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseButton,
  BaseToastNotification,
} from 'wcf-component-lib/src/components';
import TablePaymentRequest from '@/modules/tax-deliver/readytopay/component/tablePaymentRequest';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { statusPayType } from '@/constants/statusSystem';
import { formatDayThai } from '@/utils/formatGeneral';
import useLayout from 'wcf-component-lib/src/provider/LayoutProvider/useLayout';
import {
  readyToPaySelector,
  setPageForm,
  initialDataCommonType,
  ReadyToPayDataType,
  PageFormType,
  BodyCreateReadyToPayServiceType,
  createReadyToPayService,
} from '@/store-redux/slices/tax-deliver/readytopay';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import dayjs from 'dayjs';
import { PayloadAction } from '@reduxjs/toolkit';
// import CardAddress from '@/components/common/cardAddress';

interface FormType {
  cheques: TableChequeType[];
  cash: number;
}

const PaymentCheque: React.FC = () => {
  const dataTestId = 'pageReadyToPayForm';
  const dispatch = useAppDispatch();
  const { pageForm } = useSelector(readyToPaySelector);
  const router = useRouter();
  const [form] = Form.useForm();
  const [initFormData, setInitFormData] = useState<FormType>({
    ...initialDataCommonType,
    cheques: [...INIT_DATA_CHEQUE],
  });
  const [dataPaymentOrders, setDataPaymentOrders] = useState<ReadyToPayDataType[]>([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [dataSave, setDataSave] = useState<BodyCreateReadyToPayServiceType>();
  const {
    stateLayout: { user },
  } = useLayout();

  //set ชื่อผู้เตรียมจ่าย จาก user login
  useEffect(() => {
    if (!user) return;

    const newPageForm = {
      ...pageForm,
      paymentAgent: `${user?.firstName} ${user?.lastName}`,
      payDate: pageForm.cardConsider?.payDate || '',
      payTypeTabActive: 'S',
    } as PageFormType;
    if (JSON.stringify(newPageForm) !== JSON.stringify(pageForm)) {
      void dispatch(setPageForm(newPageForm));
    }
  }, [dispatch, user, pageForm]);

  useEffect(() => {
    setDataPaymentOrders(pageForm.tableList);
  }, [pageForm.tableList]);

  const onFinish: FormProps<FormType>['onFinish'] = (values) => {
    //sum จำนวนเงินใบสั่งจ่าย
    const sumPaymentOrder = dataPaymentOrders.reduce(
      (acc: number, item: { amount: number }) => acc + Number(item.amount),
      0,
    );

    //validate กรุณาเลือกใบสั่งจ่ายอย่างน้อย 1 รายการ
    if (dataPaymentOrders.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('004');

      return;
    }

    //เช็คต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.cheques && values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }

    if (values.cheques !== undefined) {
      //เช็คจำนวนเงินรวม cheques และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + Number(item.amount), 0);

      if (sumCheque !== sumPaymentOrder) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    if (values.cash !== undefined) {
      //เช็คจำนวนเงินรวม cach และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const cash = Number(values.cash);

      if (cash !== sumPaymentOrder) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    const manipulateDataSave: BodyCreateReadyToPayServiceType = {
      payType: 'S',
      payBy: values.cheques ? 'C' : 'X',
      paymentList: dataPaymentOrders.map((item) => {
        return { paymentNo: item.paymentNo };
      }),
      ...(values.cheques && {
        chequeInfoList: values.cheques.map((item) => {
          return {
            chequeNo: item.chequeNo,
            bankCode: item.bankCode || '',
            chequeAmount: Number(item.amount),
            chequeDate: dayjs(item.chequeStampDate).format('YYYY-MM-DD'),
          };
        }),
      }),
      ...(values.cash && {
        cashAmount: Number(values.cash),
      }),
    };

    //set data save for confirm modal
    setDataSave(manipulateDataSave);

    setIsOpenConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!dataSave) return;
    const resCreateApi = (await dispatch(createReadyToPayService(dataSave))) as PayloadAction<{
      prepareToPayId: string;
    }>;
    if (resCreateApi.payload) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });
      //redirect to หน้ารายละเอียดการเตรียมจ่าย
      router.push(`${URL.taxDeliver.taxDeliverReadyToPayChequeDetail.url}?id=${resCreateApi.payload.prepareToPayId}`);

      //close modal confirm
      setIsOpenConfirmModal(false);
    }
  };

  useEffect(() => {
    //update state ของ form when data change
    setInitFormData((prev) => {
      const newData = { ...prev };

      return {
        ...newData,
        cheques: (form.getFieldValue('cheques') as TableChequeType[]) || [...INIT_DATA_CHEQUE],
        cash: (form.getFieldValue('cash') as number) || 0,
      };
    });
  }, [dataPaymentOrders, form]);

  return (
    <div className=' flex flex-col justify-center gap-4 mx-4 mb-6'>
      <BaseForm name='paymentCheque' onFinish={onFinish} initialValues={initFormData} extraForm={form}>
        <div className='flex flex-col gap-4'>
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='flex flex-col gap-4'>
              <p className='header-card'> รายละเอียด</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info'>เลขที่เอกสาร</p>
                    <p className='text-display'>-</p>
                  </div>
                </Col>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info'>ผู้เตรียมจ่าย</p>
                    <p className='text-display'>{pageForm.paymentAgent}</p>
                  </div>
                </Col>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info'>วันที่เตรียมจ่าย</p>
                    <p className='text-display'>{formatDayThai(pageForm.payDate)}</p>
                  </div>
                </Col>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info'>วิธีการชำระเงิน</p>
                    <p className='text-display'>{statusPayType[pageForm.payTypeTabActive]}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          {/* Table รายการสั่งจ่าย */}
          {dataPaymentOrders && (
            <TablePaymentRequest
              dataTestId={dataTestId}
              tabActive={'S'}
              data={dataPaymentOrders}
              setData={setDataPaymentOrders}
              mode='input'
            />
          )}

          {/* address */}
          {/* <CardAddress dataTestId={dataTestId} mode='input' /> */}

          {/* Tab เช็ค เงินสด */}

            <div className='-mt-4 bg-white rounded-b-xl'>
              <Form.List name='cheques'>
                {(_, { add, remove }) => {
                  return (
                    <>
                      <TableCheque
                        itemName='cheques'
                        form={form}
                        add={add}
                        remove={remove}
                        mode='add'
                        dataTestId={dataTestId}
                      />
                    </>
                  );
                }}
              </Form.List>
            </div>

          <div className='flex flex-row justify-center items-center gap-4'>
            <BaseButton
              id={`${dataTestId}-cancel-button`}
              size='large'
              type='cancel'
              label='ยกเลิก'
              onClick={() => router.push(URL.taxDeliver.taxDeliverReadyToPayChequeDetail.url)}
            />
            <BaseButton id={`${dataTestId}-save-button`} size='large' label='บันทึก' onClick={() => form.submit()} />
          </div>
        </div>
        <PopUpConfirmSave
          isOpen={isOpenConfirmModal}
          setIsOpen={setIsOpenConfirmModal}
          dataTestId={dataTestId}
          handleConfirm={() => void handleConfirm()}
        />

        <PopUpWarning
          code={codeWarningModal}
          dataTestId={dataTestId}
          isOpen={isOpenWarningModal}
          setIsOpen={setIsOpenWarningModal}
          handleConfirm={() => setIsOpenWarningModal(false)}
        />
      </BaseForm>
    </div>
  );
};

export default PaymentCheque;
