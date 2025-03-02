'use client';
import React, { useState, useMemo } from 'react';
import { Form } from 'wcf-component-lib/node_modules/antd';
import { BaseForm, BaseButton, BaseToastNotification, BaseItemTextArea } from 'wcf-component-lib/src/components';

import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { requiredRule, maxRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

import { useSelector } from 'react-redux';
import {
  initialState,
  readyToPayDoctorSalarySelector,
  insertDoctorSalalyService,
  MType,
  setPagePaymentForm,
} from '@/store-redux/slices/readytopay/doctor-salary';

import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import { useAppDispatch } from '@/store-redux/store';
import CardPaymentDetail from '@/modules/readytopay/doctor-salary/component/cardPaymentDetail';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import TableRequestPayment, {
  TableRequestPaymentType,
} from '@/modules/readytopay/doctor-salary/component/tableRequestPayment';

export default function PaymentCheque(): React.ReactElement {
  const dataTestId = 'page-payment-cheque-form';
  const [form] = Form.useForm();
  const router = useRouter();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [searchObj, setSearchObj] = useState({}); //เตรียมค่าก่อนบันทึก
  const dispatch = useAppDispatch();
  const {
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

    if (searchObj) {
      void dispatch(setPagePaymentForm({ ...pageDoctorSalalyForm, payType: payType }));
      // Call API Thunks
      dispatch(insertDoctorSalalyService(searchObj as MType))
        .unwrap()
        .then((response) => {
          console.log('API response', response);
          router.push(`${URL.readytopay.paymentCheckDetail.url}?id=${response.prepareToPayId}`);
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
    address: string;
  }): void => {
    console.log('onFinish: ', values);

    // Prepare paymentList
    const paymentList = values.requestPayment.map((item) => ({
      paymentNo: item.paymentNo,
    }));

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
      postAddress: values.address,
      paymentList: paymentList,
      chequeInfoList: chequeInfoList,
    });

    // เช็คต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }

    // Check if the sum of cheques and payment list amounts are equal
    const sumCheque = values.cheques.reduce((acc: number, item) => acc + Number(item.amount), 0);
    const sumPaymentList = values.requestPayment.reduce((acc: number, item) => acc + item.amount, 0);
    console.log('sumCheque', sumCheque, 'sumPaymentList', sumPaymentList);

    if (sumCheque !== sumPaymentList) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('001');

      return;
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

    const newData = {
      ...initialState.pageDoctorSalalyForm.tabs[
        pageDoctorSalalyForm.payType as keyof typeof initialState.pageDoctorSalalyForm.tabs
      ],
      paymentList: selectedData,
      cheques: INIT_DATA_CHEQUE,
    };

    return newData;
  }, [pageDoctorSalalyForm.payType, selectList]);

  return (
    <div className='m-4 flex flex-col gap-4'>
      <CardPaymentDetail dataTestId={dataTestId} tabActive={'S'} />

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
                        tabPaymentActive={'S'}
                      />
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}
          <div className='w-full bg-white shadow-sm rounded-lg flex flex-col gap-4 p-6'>
            <p className='header-card'>ส่งเช็คทางไปรษณีย์</p>
            <div className='w-full'>
              <BaseItemTextArea
                id={`${dataTestId}-input-textarea`}
                itemName='address'
                label='ที่อยู่'
                rules={[requiredRule('ที่อยู่'), maxRule('ที่อยู่', 400)]}
              />
            </div>
          </div>

          {form && (
            <div className='bg-white rounded-lg'>
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

          <div className='flex justify-center  gap-4'>
            <BaseButton
              id={`${dataTestId}-button-cancel`}
              type='cancel'
              size='large'
              label='ยกเลิก'
              className='min-w-[240px] bg-[#dedede] hover:bg-red-500'
              onClick={() => router.push(URL.readytopay.doctorSalary.url)}
            />
            <BaseButton
              id={`${dataTestId}-button-submit`}
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
