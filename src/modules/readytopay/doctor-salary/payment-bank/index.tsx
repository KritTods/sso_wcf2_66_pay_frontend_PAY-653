'use client';
import React, { useState, useMemo } from 'react';
import { Form } from 'wcf-component-lib/node_modules/antd';

import { BaseForm, BaseButton, BaseToastNotification } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
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
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import CardPaymentDetail from '@/modules/readytopay/doctor-salary/component/cardPaymentDetail';

export default function Paymentbank(): React.JSX.Element {
  const dataTestId = 'page-payment-banks-form';
  const [form] = Form.useForm();
  const router = useRouter();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false); //บันทึกข้อมูลใช่หรือไม่?
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [searchObj, setSearchObj] = useState({}); //เตรียมค่าก่อนบันทึก
  const dispatch = useAppDispatch();

  const {
    filter,
    pageDoctorSalalyForm,
    pageDoctorSalalyForm: { payType, selectList },
  } = useSelector(readyToPayDoctorSalarySelector);

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
          router.push(`${URL.readytopay.paymentBankDetail.url}?id=${response.prepareToPayId}`);
        })
        .catch((error) => {
          console.error('API error', error);
        });
    }

    //close modal
    setIsOpenConfirmModal(false);
  };

  const onFinish = (values: { requestPayment: TableRequestPaymentType[]; cheques: TableChequeType[] }): void => {
    console.log('onFinish: ', values);

    //validate กรุณาเลือกใบสั่งจ่ายอย่างน้อย 1 รายการ
    if (values.requestPayment.length == 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('004');

      return;
    }

    //validate กรุณาเพิ่มเช็คอย่างน้อย 1 รายการ
    if (values.cheques.length == 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }

    // validate จำนวนเงินไม่สอดคล้อง
    const sumCheque = values.cheques.reduce((acc: number, item) => acc + Number(item.amount), 0);
    const sumPaymentList = values.requestPayment.reduce((acc: number, item) => acc + item.amount, 0);
    console.log('sumCheque', sumCheque, 'sumPaymentList', sumPaymentList);

    if (sumCheque !== sumPaymentList) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('001');

      return;
    }

    // Prepare paymentList
    const paymentList = values.requestPayment.map((item) => ({
      paymentNo: item.paymentNo,
    }));

    // Prepare chequeInfoList
    const chequeInfoList = values.cheques.map((item) => ({
      chequeNo: item.chequeNo,
      bankCode: filter.bankCode,
      chequeAmount: Number(item.amount),
      //TODO: Change to use dayjs (fix build error)
      // chequeDate: new Date(item.chequeStampDate).toISOString().split('T')[0], // Format date as YYYY-MM-DD
    }));

    // Set the prepared data
    setSearchObj({
      payType: 'T',
      payBy: 'C',
      paymentList: paymentList,
      chequeInfoList: chequeInfoList,
    });

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

    // Create a manipulated version of INIT_DATA_CHEQUE with mode set to 'custom'
    const manipulatedCheques = INIT_DATA_CHEQUE.map((cheque) => ({
      ...cheque,
      mode: 'custom', // Override the mode to 'custom'
    }));

    console.log('manipulatedCheques', manipulatedCheques);

    const newData = {
      ...initialState.pageDoctorSalalyForm.tabs[
        pageDoctorSalalyForm.payType as keyof typeof initialState.pageDoctorSalalyForm.tabs
      ],
      paymentList: selectedData,
      mode: 'add',
      cheques: manipulatedCheques, // Use the manipulated cheques data
    };

    return newData;
  }, [pageDoctorSalalyForm.payType, selectList]);

  return (
    <div className=' flex flex-col justify-center gap-4'>
      <CardPaymentDetail dataTestId={dataTestId} tabActive={'B'} />

      <BaseForm extraForm={form} name='payment-promptpay-form' onFinish={onFinish} initialValues={manipulateInitData}>
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
                        tabPaymentActive={'B'}
                      />
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}

          {/* {form && (
            <div className='bg-white rounded-lg'>
              <Form.List name='cheques'>
                {(_, { add, remove }) => {
                  return (
                    <>
                      <TableCheque
                        customDisplayTable={{
                          ...CUSTOM_DISPLAY_DATA_CHEQUE,
                          id: 'input',
                          bankCode: 'text',
                          chequeStampDate: 'input',
                          amount: 'input',
                          chequeNo: 'input',
                        }}
                        itemName='cheques'
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
          )} */}
          <div className='flex justify-center gap-4'>
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
    </div>
  );
}
