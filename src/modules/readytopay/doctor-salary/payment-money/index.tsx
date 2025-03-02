'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Col, Row, Form, TabsProps } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseButton,
  BaseToastNotification,
  BaseTabs,
  BaseItemInputNumber,
  BaseIcon,
} from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import ModalPaymentOrder from '@/modules/readytopay/doctor-salary/component/modalPaymentOrder';
// import TablePaymentRequest from '@/modules/readytopay/doctor-salary/component/tablePaymentRequest';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import {
  initialState,
  readyToPayDoctorSalarySelector,
  insertDoctorSalalyService,
  MType,
  setPagePaymentForm,
} from '@/store-redux/slices/readytopay/doctor-salary';
import { useAppDispatch } from '@/store-redux/store';
import CardPaymentDetail from '@/modules/readytopay/doctor-salary/component/cardPaymentDetail';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import TableRequestPayment, {
  TableRequestPaymentType,
} from '@/modules/readytopay/doctor-salary/component/tableRequestPayment';
import TableMoney, { TableMoneyType, CUSTOM_DISPLAY_TABLE_MONEY } from '@/components/common/tableMoney';
import { Cash } from 'wcf-component-lib/node_modules/iconoir-react';

export default function PaymentMoney(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>('cheque');
  const [form] = Form.useForm();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false); //บันทึกข้อมูลใช่หรือไม่?
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>(''); //ธนาณัติต้องมีเงินอย่างน้อย 1 รายการ
  const [searchObj, setSearchObj] = useState({}); //เตรียมค่าก่อนบันทึก
  const dispatch = useAppDispatch();

  const dataTestId = 'page-payment-money-form';
  const router = useRouter();

  const {
    pageDoctorSalalyForm,
    pageDoctorSalalyForm: { payType, selectList },
  } = useSelector(readyToPayDoctorSalarySelector);

  console.log('selectList', selectList);

  const items: TabsProps['items'] = [
    {
      key: 'cheque',
      label: (
        <div className='flex justify-center items-center h-[72px] -mt-[6px] w-full'>
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
        <div className='flex justify-center items-center h-[72px] -mt-[6px] w-full'>
          <Cash className='mr-2' />
          <span>เงินสด</span>
        </div>
      ),
    },
  ];

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'เสร็จสิ้น',
      description: 'ทำรายการเสร็จสิ้น',
    });

    // console.log('searchObj', searchObj);

    if (searchObj) {
      void dispatch(setPagePaymentForm({ ...pageDoctorSalalyForm, payType: payType }));
      // Call API Thunks
      dispatch(insertDoctorSalalyService(searchObj as MType))
        .unwrap()
        .then((response) => {
          console.log('API response', response);
          router.push(`${URL.readytopay.paymentMoneyDetail.url}?id=${response.prepareToPayId}`);
        })
        .catch((error) => {
          console.error('API error', error);
        });
    }

    //close modal
    setIsOpenConfirmModal(false);
  };

  const onFinish = (values: {
    requestPayment: TableRequestPaymentType[];
    cheques: TableChequeType[];
    moneys: TableMoneyType[];
    amount: number;
  }): void => {
    // console.log('values', values);

    //เช็คต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.cheques && values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }
    //ธนาณัติต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.moneys.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('200');

      return;
    }

    if (values.cheques) {
      //เช็คจำนวนเงินรวม cheques และ moneys ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + Number(item.amount), 0);
      const sumMoney = values.moneys.reduce((acc: number, item: TableMoneyType) => acc + Number(item.amount), 0);
      console.log('sumCheque', sumCheque, 'sumMoney', sumMoney);
      if (sumCheque !== sumMoney) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    const paymentList = values.requestPayment.map((item) => ({
      paymentNo: item.paymentNo,
    }));

    //TODO: add chequeDate later (fix build error)
    let chequeInfoList: { chequeNo: string; bankCode: string; chequeAmount: number; }[] = [];
    if (values.cheques) {
      chequeInfoList = values.cheques.map((item) => ({
        chequeNo: item.chequeNo || '',
        bankCode: item.bankCode || '',
        chequeAmount: Number(item.amount) || 0,
        //TODO: Change to use dayjs (fix build error)
        // chequeDate: new Date(item.chequeStampDate).toISOString().split('T')[0] || '', // Format date as YYYY-MM-DD
      }));
    }

    const postalInfoList = values.moneys.map((item) => ({
      paymentNo: 'PMT002',
      postalNo: item.postalNo,
      postalCode: item.postalCode,
      postalDestination: item.portalDestination,
      postalAmount: Number(item.amount),
    }));

    if (activeTab === 'cheque') {
      //เช็ค
      setSearchObj({
        payType: payType,
        payBy: 'C',
        paymentList: paymentList,
        chequeInfoList: chequeInfoList,
        postalInfoList: postalInfoList,
      });
    } else {
      //เงินสด
      setSearchObj({
        payType: payType,
        payBy: 'X',
        cashAmount: values.amount,
        paymentList: paymentList,
        postalInfoList: postalInfoList,
      });
    }

    setIsOpenConfirmModal(true);
  };

  useEffect(() => {
    console.log('Updated searchObj:', searchObj);
  }, [searchObj]); // เมื่อ searchObj เปลี่ยนแปลง

  const manipulateInitData = useMemo(() => {
    const selectedData = selectList.map((item) => ({
      paymentNo: item.paymentNo,
      accidentIssueCode: item.accidentIssueCode,
      employeeCitizenId: item.employeeCitizenId,
      fullName: item.fullName,
      amount: item.amount,
      hospital: item.hospital,
    }));

    const selectedMoneyData = selectList.map((item) => ({
      id: uuidv4(),
      postalNo: '', // เลขที่ธนาณัติ
      portalDestination: item.postal?.postalName, // ชื่อไปรษณีย์ปลายทาง
      postalCode: item.postal?.postalCode, // รหัสไปรษณีย์ปลายทาง
      receiverName: item.fullName, // ชื่อผู้มีสิทธิ์
      amount: item.amount, // จำนวนเงิน
      mode: 'custom',
    }));

    const newData = {
      ...initialState.pageDoctorSalalyForm.tabs[
        pageDoctorSalalyForm.payType as keyof typeof initialState.pageDoctorSalalyForm.tabs
      ],
      paymentList: selectedData,
      cheques: INIT_DATA_CHEQUE,
      moneys: selectedMoneyData,
    };

    return newData;
  }, [pageDoctorSalalyForm.payType, selectList]);

  return (
    <div className='flex flex-col gap-4 mx-4'>
      <CardPaymentDetail dataTestId={dataTestId} tabActive={'P'} />

      <BaseForm extraForm={form} name={dataTestId} onFinish={onFinish} initialValues={manipulateInitData}>
        <div className='flex flex-col gap-4'>
          {/* Table รายการสั่งจ่าย */}
          {form && (
            <div className='bg-white rounded-lg'>
              <Form.List name='requestPayment'>
                {(_, { add, remove }) => {
                  return (
                    <>
                      <TableRequestPayment
                        itemName='requestPayment'
                        form={form}
                        add={add}
                        remove={remove}
                        mode='add'
                        dataTestId={dataTestId}
                        tabPaymentActive={'P'}
                      />
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}

          <BaseTabs
            className='w-full'
            defaultActiveKey={'cheque'}
            items={items}
            onChange={(key: string) => setActiveTab(key)}
          />
          {activeTab === 'cheque' && form && (
            <div className='-mt-4 bg-white rounded-b-lg'>
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
            <div className='-mt-4 bg-white rounded-b-lg'>
              <div className='p-6'>
                <p className='header-card'>เงินสด</p>
                <Row gutter={[16, 16]}>
                  <Col {...formColumn}>
                    <BaseItemInputNumber
                      id={`${dataTestId}-amount-label-value`}
                      label='จำนวนเงิน (บาท)'
                      className='w-full'
                      rules={[{ required: true, message: 'กรุณากรอก' }]}
                      itemName='amount'
                      step={1}
                      hideFieldControl={true}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          )}

          {form && (
            <div className='bg-white rounded-lg'>
              <Form.List name='moneys'>
                {(_, { add, remove }) => {
                  return (
                    <>
                      <TableMoney
                        customDisplayTable={{
                          ...CUSTOM_DISPLAY_TABLE_MONEY,
                          postalNo: 'input',
                          portalDestination: 'text',
                          postalCode: 'text',
                          receiverName: 'text',
                          amount: 'text',
                        }}
                        isNotShadow
                        hideButtonAdd
                        itemName='moneys'
                        form={form}
                        add={add}
                        remove={remove}
                        mode='custom'
                        dataTestId={dataTestId}
                      />
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}
          <div className='flex justify-center  gap-4'>
            <BaseButton
              type='cancel'
              size='large'
              label='ยกเลิก'
              className='min-w-[240px] bg-[#dedede] hover:bg-red-500'
              onClick={() => router.push(URL.readytopay.doctorSalary.url)}
            />
            <BaseButton
              size='large'
              label='บันทึกข้อมูล'
              className='w-[240px]'
              htmlType='submit'
              onClick={() => form.submit()}
            />
          </div>
        </div>
      </BaseForm>

      <PopUpConfirmSave
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
      />

      <PopUpWarning
        code={codeWarningModal}
        dataTestId={dataTestId}
        isOpen={isOpenWarningModal}
        setIsOpen={setIsOpenWarningModal}
        handleConfirm={() => setIsOpenWarningModal(false)}
      />

      <ModalPaymentOrder
        isOpenModal={isOpenCreateModal}
        setOpenModal={setIsOpenCreateModal}
        dataTestId={dataTestId}
        tabActive={'P'}
      />
    </div>
  );
}
