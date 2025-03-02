'use client';
import React, { useState, useMemo } from 'react';
import { Form, Col, Row, TabsProps } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import {
  BaseTabs,
  BaseIcon,
  BaseForm,
  BaseItemInputNumber,
  BaseButton,
  BaseToastNotification,
} from 'wcf-component-lib/src/components';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import TableRequestPayment, {
  TableRequestPaymentType,
} from '@/modules/readytopay/doctor-salary/component/tableRequestPayment';
import {
  initialState,
  readyToPayDoctorSalarySelector,
  insertDoctorSalalyService,
  MType,
  setPagePaymentForm,
} from '@/store-redux/slices/readytopay/doctor-salary';
// import CardCheque from '@/modules/readytopay/doctor-salary/payment-office/cardCheque';
import { Cash } from 'wcf-component-lib/node_modules/iconoir-react';

import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import CardPaymentDetail from '@/modules/readytopay/doctor-salary/component/cardPaymentDetail';

export default function PaymentOffice(): React.ReactElement {
  const dataTestId = 'page-payment-office-form';
  const [activeTab, setActiveTab] = useState<string>('cheque');
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [searchObj, setSearchObj] = useState({}); //เตรียมค่าก่อนบันทึก
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    pageDoctorSalalyForm,
    pageDoctorSalalyForm: { payType, selectList },
  } = useSelector(readyToPayDoctorSalarySelector);

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

    console.log('searchObj', searchObj);

    if (searchObj) {
      void dispatch(setPagePaymentForm({ ...pageDoctorSalalyForm, payType: payType }));
      // Call API Thunks
      dispatch(insertDoctorSalalyService(searchObj as MType))
        .unwrap()
        .then((response) => {
          console.log('API response', response);
          router.push(`${URL.readytopay.paymentOfficeDetail.url}?id=${response.prepareToPayId}`);
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
    amount: number;
  }): void => {
    console.log('onFinish: ', values);

    //validate กรณี จ่ายเงิน ณ สำนักงาน มีใบสั่งจ่ายได้แค่ 1 ใบ
    if (values.requestPayment.length > 1) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('005');

      return;
    }

    //รวมรายการสั่งจ่าย
    const sumPaymentList = values.requestPayment.reduce((acc: number, item) => acc + item.amount, 0);

    console.log('amount', Number(values.amount), 'sumPaymentList', sumPaymentList, 'activeTab', activeTab);

    // Prepare paymentList
    const paymentList = values.requestPayment.map((item) => ({
      paymentNo: item.paymentNo,
    }));

    //validate กรุณาเลือกใบสั่งจ่ายอย่างน้อย 1 รายการ
    if (values.requestPayment.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('004');

      return;
    }

    if (activeTab === 'cheque') {
      // Check if there are any cheques
      if (values.cheques.length === 0) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('000');

        return;
      }

      // Check if the sum of cheques and payment list amounts are equal
      const sumCheque = values.cheques.reduce((acc: number, item) => acc + Number(item.amount), 0);

      console.log('sumCheque', sumCheque, 'sumPaymentList', sumPaymentList);

      if (sumCheque !== sumPaymentList) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }

      // Prepare chequeInfoList
      const chequeInfoList = values.cheques.map((item) => ({
        chequeNo: item.chequeNo,
        bankCode: item.bankCode,
        chequeAmount: Number(item.amount),
        //TODO: Change to use dayjs (fix build error)
        // chequeDate: new Date(item.chequeStampDate).toISOString().split('T')[0], // Format date as YYYY-MM-DD
      }));

      // Set the prepared data
      setSearchObj({
        payType: payType,
        payBy: 'C',
        paymentList: paymentList,
        chequeInfoList: chequeInfoList,
      });
    }
    if (activeTab === 'cash') {
      console.log('sumCheque', Number(values.amount), 'sumPaymentList', sumPaymentList);

      if (Number(values.amount) !== sumPaymentList) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }

      setSearchObj({
        payType: payType,
        payBy: 'X',
        cashAmount: Number(values.amount),
        paymentList: paymentList,
      });
    }

    setIsOpenConfirmModal(true);
  };

  const manipulateInitData = useMemo(() => {
    const selectedData = selectList.map((item) => ({
      paymentNo: item.paymentNo,
      accidentIssueCode: item.accidentIssueCode,
      employeeCitizenId: item.employeeCitizenId,
      fullName: item.fullName,
      amount: item.amount,
      hospital: item.hospital,
    }));

    console.log('INIT_DATA_CHEQUE', INIT_DATA_CHEQUE);

    const newData = {
      ...initialState.pageDoctorSalalyForm.tabs[
        pageDoctorSalalyForm.payType as keyof typeof initialState.pageDoctorSalalyForm.tabs
      ],
      paymentList: selectedData,
      mode: 'add',
      cheques: INIT_DATA_CHEQUE,
    };

    return newData;
  }, [pageDoctorSalalyForm.payType, selectList]);

  return (
    <BaseForm name='other-payment-form-X' onFinish={onFinish} extraForm={form} initialValues={manipulateInitData}>
      <div className='flex flex-col gap-4'>
        <CardPaymentDetail dataTestId={dataTestId} tabActive={'X'} />

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
                      tabPaymentActive={'X'}
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
                      headerTitle='เช็ค'
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
              <p className='header-card'>เงินสด</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <BaseItemInputNumber
                    label='จำนวนเงิน (บาท)'
                    id='amount-form'
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
    </BaseForm>
  );
}
