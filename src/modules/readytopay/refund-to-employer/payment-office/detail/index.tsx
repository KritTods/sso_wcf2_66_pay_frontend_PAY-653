'use client';
import React, { useEffect, useState } from 'react';
import { Form, Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { BaseButton, BaseForm, BaseLoading, BaseToastNotification } from 'wcf-component-lib/src/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { URL } from '@/constants/configPage';
import { PrinterOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store-redux/store';
import {
  BodyUpdateRefundToEmploerServiceType,
  getRefundtoEmployerByIdService,
  GetRefundToEmploerByIdServiceType,
  initialDataCommonType,
  RefundToEmploerDataType,
  updateRefundtoEmployerService,
} from '@/store-redux/slices/readytopay/refund-to-employer';
import { PayloadAction } from '@reduxjs/toolkit';
import { formatDayThai } from '@/utils/formatGeneral';
import TablePaymentRequest from '../../component/tablePaymentRequest';
import CacheCash from '@/components/common/cardCash';
import TableCheque, { TableChequeType } from '@/components/common/tableCheque';
import dayjs from 'dayjs';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';

interface FormType {
  tableList: RefundToEmploerDataType[];
  cheques: TableChequeType[];
  cash: number;
}

export default function OfficeDetail(): React.JSX.Element {
  const dataTestId = 'pageRefundToEmployerDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [dataDetail, setDetail] = useState<GetRefundToEmploerByIdServiceType>();
  const [dataPaymentOrders, setDataPaymentOrders] = useState<RefundToEmploerDataType[]>([]);
  const [dataPaymentOrdersEdit, setDataPaymentOrdersEdit] = useState<RefundToEmploerDataType[]>([]);
  const [initFormData, setInitFormData] = useState<FormType>({
    ...initialDataCommonType,
    cheques: [],
    tableList: [],
  });
  //for case update
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [dataSave, setDataSave] = useState<BodyUpdateRefundToEmploerServiceType>();

  useEffect(() => {
    if (!id) return;
    const fetchData = async (): Promise<void> => {
      //call api detail by id
      const resDetail = (await dispatch(
        getRefundtoEmployerByIdService(id),
      )) as PayloadAction<GetRefundToEmploerByIdServiceType>;

      if (resDetail.payload) {
        //set data detail รายละเอียด
        setDetail(resDetail.payload);
      }
    };
    void fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (!dataDetail) return;

    //update state ของ form when data change
    setInitFormData((prev) => {
      const newData = { ...prev };

      return {
        ...newData,
        cheques: (form.getFieldValue('cheques') as TableChequeType[]) || [],
        cash: (form.getFieldValue('cash') as number) || 0,
      };
    });
  }, [dataDetail, form, dataPaymentOrdersEdit]);

  //update cheques to form
  useEffect(() => {
    if (!dataDetail) return;

    //update state ของ form when data change
    const cheques = dataDetail.chequeInfoList.map((item) => {
      return {
        id: item.chequeInfoId,
        chequeNo: item.chequeNo,
        bankCode: item.bank.code,
        bankBranchCode: '',
        amount: item.chequeAmount,
        chequeStampDate: item.chequeDate,
        mode: mode,
      };
    });

    form.setFieldsValue({
      cheques,
    });
  }, [dataDetail, mode, form]);

  useEffect(() => {
    if (!dataDetail) return;

    //set data payment orders รายการสั่งจ่าย
    setDataPaymentOrders(dataDetail.paymentList);

    //set data payment orders รายการสั่งจ่าย สำหรับ edit
    setDataPaymentOrdersEdit(dataDetail.paymentList);

    //set form data
    setInitFormData((prev) => {
      const newData = { ...prev };
      //map feilds cheques
      const cheques = dataDetail.chequeInfoList.map((item) => {
        return {
          id: item.chequeInfoId,
          chequeNo: item.chequeNo,
          bankCode: item.bank.code,
          bankBranchCode: '',
          amount: item.chequeAmount,
          chequeStampDate: item.chequeDate,
          mode: mode,
        };
      });

      return {
        ...newData,
        cheques,
        cash: dataDetail.cashAmount,
      };
    });
  }, [dataDetail, mode]);

  const onFinish: FormProps<FormType>['onFinish'] = (values) => {
    if (!dataDetail) return;

    const sumPaymentOrder = dataPaymentOrdersEdit.reduce(
      (acc: number, item: { amount: number }) => acc + Number(item.amount),
      0,
    );

    //validate กรุณาเลือกใบสั่งจ่ายอย่างน้อย 1 รายการ
    if (dataPaymentOrdersEdit.length === 0) {
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

    const paymentList = dataPaymentOrdersEdit.map((item: { paymentNo: string }) => {
      return {
        paymentNo: item.paymentNo,
      };
    });

    let dataBody: BodyUpdateRefundToEmploerServiceType = {
      prepareToPayId: dataDetail.prepareToPayId,
      paymentList,
    };

    //case cash
    if (dataDetail.payBy.code === 'X') {
      dataBody = {
        ...dataBody,
        cashAmount: Number(values.cash),
      };
    }

    //case cheques
    if (dataDetail.payBy.code === 'C') {
      const chequeInfoList = values.cheques.map((item) => {
        return {
          chequeInfoId: item.id,
          chequeNo: item.chequeNo,
          bankCode: item.bankCode,
          chequeAmount: Number(item.amount),
          chequeDate: dayjs(item.chequeStampDate).format('YYYY-MM-DD'),
        };
      }) as {
        chequeInfoId: string;
        chequeNo: string;
        bankCode: string;
        chequeAmount: number;
        chequeDate: string;
      }[];

      dataBody = {
        ...dataBody,
        chequeInfoList,
      };
    }

    //set data save for update
    setDataSave(dataBody);
    setIsOpenConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!dataSave) return;
    console.log('dataSave : ', dataSave);

    const resCreateApi = (await dispatch(updateRefundtoEmployerService(dataSave))) as PayloadAction<{
      prepareToPayId: string;
    }>;
    if (resCreateApi.payload) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });

      const fetchData = async (): Promise<void> => {
        //call api detail by id
        const resDetail = (await dispatch(
          getRefundtoEmployerByIdService(resCreateApi.payload.prepareToPayId),
        )) as PayloadAction<GetRefundToEmploerByIdServiceType>;
        if (resDetail.payload) {
          //set data detail รายละเอียด
          setDetail(resDetail.payload);
        }
      };
      void fetchData();

      //close modal confirm
      setIsOpenConfirmModal(false);
      //set mode view
      setMode('view');
    }
  };

  //loading Page
  if (!dataDetail) {
    return <BaseLoading size='default' />;
  }

  return (
    <BaseForm extraForm={form} name='paymentOfficeEdit' initialValues={initFormData} onFinish={onFinish}>
      <div className='flex flex-col gap-4 mx-5 mb-6'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'> รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่เอกสาร</p>
                  <p className='text-display'>{dataDetail.documentNo || '-'}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>ผู้เตรียมจ่าย</p>
                  <p className='text-display'>{dataDetail.createdBy || '-'}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วันที่เตรียมจ่าย</p>
                  <p className='text-display'>{formatDayThai(dataDetail.createdDate) || '-'}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วิธีการชำระเงิน</p>
                  <p className='text-display'>{dataDetail.payType.name}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Table รายการสั่งจ่าย */}

        <TablePaymentRequest
          dataTestId={dataTestId}
          tabActive={'X'}
          data={mode === 'edit' ? dataPaymentOrdersEdit : dataPaymentOrders}
          setData={mode === 'edit' ? setDataPaymentOrdersEdit : setDataPaymentOrders}
          mode={mode === 'edit' ? 'input' : 'view'}
        />

        {dataDetail.payBy.code === 'C' && form && (
          <div className='bg-white rounded-xl '>
            <Form.List name='cheques'>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableCheque
                      itemName='cheques'
                      form={form}
                      add={add}
                      remove={remove}
                      mode={mode}
                      dataTestId={dataTestId}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        {/* เงินสด */}
        {dataDetail.payBy.code === 'X' && (
          <CacheCash dataTestId={dataTestId} cash={dataDetail.cashAmount} mode={mode === 'edit' ? 'input' : 'view'} />
        )}

        {/* button action */}
        <div className='flex justify-center gap-4'>
          {mode === 'edit' && (
            <>
              <BaseButton
                size='large'
                type='cancel'
                label='ยกเลิก'
                className='w-[240px]'
                onClick={() => {
                  setMode('view');
                }}
              />
              <BaseButton
                size='large'
                type='primary'
                label='บันทึก'
                className='w-[240px]'
                onClick={() => form.submit()}
              />
            </>
          )}
          {mode === 'view' && (
            <>
              <BaseButton
                size='large'
                type='cancel'
                label='ยกเลิก'
                className='w-[240px]'
                onClick={() => {
                  router.push(URL.readytopay.refundToEmployer.url);
                }}
              />
              <BaseButton
                size='large'
                type='outline'
                label='แก้ไข'
                className='w-[240px]'
                onClick={() => setMode('edit')}
              />

              <BaseButton
                size='large'
                type='primary'
                label='ตัดจ่าย'
                className='w-[240px]'
                onClick={() => {
                  router.push(`${URL.cutOffPayment.cutOffPaymentRefundToEmployerOffice.url}?id=${id}`);
                }}
              />
              <BaseButton size='large' label='พิมหนังสือในนามเช็ค' icon={<PrinterOutlined />} className='w-[240px]' />
            </>
          )}
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
  );
}
