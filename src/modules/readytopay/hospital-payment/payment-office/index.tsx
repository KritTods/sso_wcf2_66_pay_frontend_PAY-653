'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Col, Row, TabsProps, Form, FormProps } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import {
  BaseTabs,
  BaseIcon,
  BaseForm,
  BaseItemInputNumber,
  BaseButton,
  BaseToastNotification,
} from 'wcf-component-lib/src/components';
import TablePaymentRequest from '@/modules/readytopay/hospital-payment/component/tablePaymentRequest';
import { Cash } from 'wcf-component-lib/node_modules/iconoir-react';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { statusPayType } from '@/constants/statusSystem';
import { formatDayThai } from '@/utils/formatGeneral';
import useLayout from 'wcf-component-lib/src/provider/LayoutProvider/useLayout';
import {
  hospitalPaymentSelector,
  setPageForm,
  initialDataCommonType,
  BodyCreateHospitalServiceType,
  createHospitalService,
  ReadyToPayDataType,
  PageFormType,
} from '@/store-redux/slices/readytopay/hospital-payment';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import CardDetailTax from '@/components/common/cardDetailTax';
import { requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import dayjs from 'dayjs';
import { PayloadAction } from '@reduxjs/toolkit';

interface FormType {
  cheques: TableChequeType[];
  cash: number;
  taxHotpitalName: string;
  taxAmount: number;
  taxPercent: number;
  taxAmountAfterCalTax: number;
  taxTotalAmountAfterCalTax: number;
}

const PaymentOffice: React.FC = () => {
  const dataTestId = 'pageHospitalPaymentForm';
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>('cheque');
  const { pageForm } = useSelector(hospitalPaymentSelector);
  const router = useRouter();
  const [form] = Form.useForm();
  const [taxPercent, setTaxPercent] = useState<number>(1);
  const [initFormData, setInitFormData] = useState<FormType>({
    ...initialDataCommonType,
    taxHotpitalName: '',
    taxAmount: 0,
    taxPercent,
    taxAmountAfterCalTax: 0,
    taxTotalAmountAfterCalTax: 0,
    cheques: [...INIT_DATA_CHEQUE],
  });
  const [dataPaymentOrders, setDataPaymentOrders] = useState<ReadyToPayDataType[]>([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [dataSave, setDataSave] = useState<BodyCreateHospitalServiceType>();
  const {
    stateLayout: { user },
  } = useLayout();

  //set ชื่อผู้เตรียมจ่าย จาก user login
  useEffect(() => {
    if (!user) return;

    const newPageForm = {
      ...pageForm,
      paymentAgent: `${user?.firstName} ${user?.lastName}`,
      payTypeTabActive: 'X',
    } as PageFormType;
    if (JSON.stringify(newPageForm) !== JSON.stringify(pageForm)) {
      void dispatch(setPageForm(newPageForm));
    }
  }, [dispatch, user, pageForm]);

  useEffect(() => {
    setDataPaymentOrders(pageForm.tableList);
  }, [pageForm.tableList]);

  const items: TabsProps['items'] = [
    {
      key: 'cheque',
      label: (
        <div className='flex justify-center items-center h-[58px]'>
          <BaseIcon
            name='payOrders'
            size='24px'
            className='!mr-1'
            classNameColor={{
              base: '!text-primary',
              active: 'white-text',
              disabled: 'text-primary-very-bright',
            }}
            disabled={false}
            active={activeTab === 'cheque'}
          />
          <span>เช็ค</span>
        </div>
      ),
    },
    {
      key: 'cash',
      label: (
        <div className='flex justify-center items-center h-[58px]'>
          <Cash className='mr-2' />
          <span>เงินสด</span>
        </div>
      ),
    },
  ];

  const onFinish: FormProps<FormType>['onFinish'] = (values) => {
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

    if (values.cheques) {
      //เช็คจำนวนเงินรวม cheques และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + Number(item.amount), 0);
      const sumPaymentOrder = dataPaymentOrders.reduce(
        (acc: number, item: { amount: number }) => acc + Number(item.amount),
        0,
      );
      if (sumCheque !== sumPaymentOrder) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    if (values.cash) {
      //เช็คจำนวนเงินรวม cach และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const cash = Number(values.cash);
      const sumPaymentOrder = dataPaymentOrders.reduce(
        (acc: number, item: { amount: number }) => acc + Number(item.amount),
        0,
      );
      if (cash !== sumPaymentOrder) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    const manipulateDataSave: BodyCreateHospitalServiceType = {
      payType: 'X',
      payBy: values.cheques ? 'C' : 'X',
      taxPercent: values.taxPercent,
      taxAmount: values.taxAmountAfterCalTax,
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
    const resCreateApi = (await dispatch(createHospitalService(dataSave))) as PayloadAction<{ prepareToPayId: string }>;
    if (resCreateApi.payload) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });
      //redirect to หน้ารายละเอียดการเตรียมจ่าย
      router.push(`${URL.readytopay.hospitalPaymentOfficeDetail.url}?id=${resCreateApi.payload.prepareToPayId}`);

      //close modal confirm
      setIsOpenConfirmModal(false);
    }
  };

  const dataCardTax = useMemo(() => {
    const taxHotpitalName = dataPaymentOrders[0]?.hospital;
    const taxAmount = dataPaymentOrders.reduce((acc, item: { amount: number }) => acc + Number(item.amount), 0);
    const taxAmountAfterCalTax = taxAmount * (Number(taxPercent) / 100);
    const taxTotalAmountAfterCalTax = taxAmount - taxAmountAfterCalTax;

    //update state ของ form when data change
    setInitFormData((prev) => {
      const newData = { ...prev };

      return {
        ...newData,
        cheques: (form.getFieldValue('cheques') as TableChequeType[]) || [...INIT_DATA_CHEQUE],
        cash: (form.getFieldValue('cash') as number) || 0,
        taxHotpitalName,
        taxAmount,
        taxPercent,
        taxAmountAfterCalTax,
        taxTotalAmountAfterCalTax,
      };
    });

    return {
      taxHotpitalName: taxHotpitalName,
      taxAmount: taxAmount,
      taxPercent: taxPercent,
      taxAmountAfterCalTax: taxAmountAfterCalTax,
      taxTotalAmountAfterCalTax: taxTotalAmountAfterCalTax,
    };
  }, [dataPaymentOrders, taxPercent, form]);

  return (
    <div className=' flex flex-col justify-center gap-4 mx-4 mb-6'>
      <BaseForm name='paymentOffice' onFinish={onFinish} initialValues={initFormData} extraForm={form}>
        <div className='flex flex-col gap-4'>
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='flex flex-col gap-4'>
              <p className='header-card'> รายละเอียด</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info'>เลขที่เอกสาร</p>
                    <p className='text-display'>{pageForm.documentNo}</p>
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
              tabActive={'X'}
              data={dataPaymentOrders}
              setData={setDataPaymentOrders}
              mode='input'
            />
          )}
          {/* Tab เช็ค เงินสด */}

          <BaseTabs
            noBackground={true}
            className='w-full'
            defaultActiveKey={'cheque'}
            items={items}
            onChange={(key: string) => setActiveTab(key)}
          />

          {activeTab === 'cheque' && form && (
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
          )}

          {activeTab === 'cash' && (
            <div className='-mt-4 bg-white rounded-b-xl'>
              <div className='p-6'>
                <p className='header-card'>สั่งจ่ายโดย : เงินสด</p>
                <Row gutter={[16, 16]}>
                  <Col {...formColumn}>
                    <BaseItemInputNumber
                      label='จำนวนเงิน (บาท)'
                      id={`${dataTestId}-cash-button`}
                      className='w-full'
                      rules={[requiredRule('จำนวนเงิน (บาท)')]}
                      itemName='cash'
                      hideFieldControl
                    />
                  </Col>
                </Row>
              </div>
            </div>
          )}

          <CardDetailTax
            dataTestId={dataTestId}
            data={dataCardTax}
            mode='input'
            callBackTaxPercent={(value) => {
              setTaxPercent(value);
            }}
          />

          <div className='flex flex-row justify-center items-center gap-4'>
            <BaseButton
              id={`${dataTestId}-cancel-button`}
              size='large'
              type='cancel'
              label='ยกเลิก'
              onClick={() => router.push(URL.readytopay.hospitalPayment.url)}
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

export default PaymentOffice;
