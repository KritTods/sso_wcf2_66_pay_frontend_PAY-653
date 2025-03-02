'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Form } from 'wcf-component-lib/node_modules/antd';
import { BaseForm, BaseButton, BaseToastNotification } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
// import TablePaymentRequest from '@/modules/readytopay/doctor-salary/component/tablePaymentRequest';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import PopUpWarning from '@/components/common/popUps/popUpWarning';
import CardPaymentDetail from '@/modules/readytopay/doctor-salary/component/cardPaymentDetail';
import TableRequestPayment from '@/modules/readytopay/doctor-salary/component/tableRequestPayment';
import { useSelector } from 'react-redux';
import {
  initialState,
  readyToPayDoctorSalarySelector,
  insertDoctorSalalyService,
  MType,
  setPagePaymentForm,
} from '@/store-redux/slices/readytopay/doctor-salary';
import { useAppDispatch } from '@/store-redux/store';

export default function PromptPay(): React.ReactElement {
  const [form] = Form.useForm();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false); //บันทึกข้อมูลใช่หรือไม่?
  const [isOpenAddRow, setIsOpenAddRow] = useState(false); //กรุณาเพิ่มเช็คอย่างน้อย 1 รายการ
  const [searchObj, setSearchObj] = useState({}); //เตรียมค่าก่อนบันทึก
  const dispatch = useAppDispatch();

  const dataTestId = 'page-payment-promptpay-form';
  const router = useRouter();

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

    console.log('searchObj', searchObj);

    if (searchObj) {
      void dispatch(setPagePaymentForm({ ...pageDoctorSalalyForm, payType: payType }));
      // Call API Thunks
      dispatch(insertDoctorSalalyService(searchObj as MType))
        .unwrap()
        .then((response) => {
          console.log('API response', response);
          router.push(`${URL.readytopay.paymentPromptPayDetail.url}?id=${response.prepareToPayId}`);
        })
        .catch((error) => {
          console.error('API error', error);
        });
    }

    //close modal
    setIsOpenConfirmModal(false);
  };

  const handleCancel = (): void => {
    setIsOpenConfirmModal(false);
    setIsOpenAddRow(false);
  };

  const onFinish = (values: unknown): void => {
    let paymentList: { paymentNo: string }[] = [];

    // ตรวจสอบว่า values เป็น Object ที่มี key requestPayment และ requestPayment เป็น Array
    if (values && Array.isArray((values as { requestPayment: unknown[] }).requestPayment)) {
      paymentList = (values as { requestPayment: { paymentNo: string }[] }).requestPayment.map((item) => ({
        paymentNo: item.paymentNo, // ดึงเฉพาะ paymentNo ออกมา
      }));
    }

    setSearchObj({
      payType: 'M',
      payBy: 'X',
      paymentList: paymentList, // ใส่ paymentList ที่ได้จากด้านบน
    });

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

    const newData = {
      ...initialState.pageDoctorSalalyForm.tabs[
        pageDoctorSalalyForm.payType as keyof typeof initialState.pageDoctorSalalyForm.tabs
      ],
      paymentList: selectedData,
    };

    return newData;
  }, [pageDoctorSalalyForm.payType, selectList]);

  console.log('InitData', manipulateInitData);

  return (
    <div className='m-4 flex flex-col gap-4'>
      <CardPaymentDetail dataTestId={dataTestId} tabActive={'M'} />

      <BaseForm extraForm={form} name={dataTestId} onFinish={onFinish} initialValues={manipulateInitData}>
        {/* Table รายการสั่งจ่าย */}
        {form && (
          <div className='bg-white rounded-xl'>
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
                      tabPaymentActive={'M'}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}
      </BaseForm>

      {/* ปุ่ม ยกเลิก/บันทึก */}
      <div className='flex justify-center  gap-4 py-6'>
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

      <PopUpConfirmSave
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
      <PopUpWarning
        code='000'
        isOpen={isOpenAddRow}
        setIsOpen={setIsOpenAddRow}
        dataTestId={dataTestId}
        handleConfirm={handleCancel}
      />
    </div>
  );
}
