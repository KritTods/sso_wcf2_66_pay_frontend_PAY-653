'use client';
import React, { useState, useEffect } from 'react';
import { Col, Row, Divider, Form } from 'wcf-component-lib/node_modules/antd';
import {
  BaseItemInput,
  BaseItemDatePicker,
  BaseButton,
  BaseToastNotification,
  BaseForm,
  BaseDialog,
  BaseIcon,
} from 'wcf-component-lib/src/components';
import dayjs from '@/utils/dayjs-setup-th';
import { DateFormat } from 'wcf-component-lib/src/constants/date-format.constant';
import { formatDateToCustom } from 'wcf-component-lib/src/utils';
import { format } from 'wcf-component-lib/src/constants/dayjsFormat';
import { PrinterOutlined } from '@ant-design/icons';
import { formColumn } from '@/constants/layoutColumn';
import { requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { useRouter, useSearchParams } from 'next/navigation';
import { URL } from '@/constants/configPage';
import Link from 'next/link';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  cutOffPaySelector,
  getPrepareBudgetService,
  initialState,
  PrepareBudgetFormType,
  setFormDataSlice,
  SeveFormCutOffPayServiceResponse,
  seveFormCutOffPayService,
  clearFormCutoffpay,
} from '@/store-redux/slices/reserve/cut-off-pay';
import { PayloadAction } from '@reduxjs/toolkit';
import { formatBankAccountNo, formatCurrency } from '@/utils/formatGeneral';

export default function CutOffPayForm(): React.ReactElement {
  const [form] = Form.useForm();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { info, form: formData } = useSelector(cutOffPaySelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prepareBudgetRequestId = searchParams.get('id');

  const dataTestId = 'page-cutoffpay-form';

  //ดึงข้อมูลบันทึกรายละเอียดตัดจ่าย (getPrepareBudgetService)
  useEffect(() => {
    if (!prepareBudgetRequestId) return;

    //Call API Thunks
    void dispatch(getPrepareBudgetService(prepareBudgetRequestId));
  }, [dispatch, prepareBudgetRequestId]);

  const handleFormSubmit = (values: PrepareBudgetFormType): void => {
    if (!prepareBudgetRequestId) return;
    values.prepareBudgetRequestId = prepareBudgetRequestId;
    //convert date
    values.payDate = dayjs(values.payDate).format(DateFormat.YYYYMMDD);

    //set data to store form
    void dispatch(setFormDataSlice(values));

    //open confirm modal
    setIsOpenConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => {
    //get form value from store and save form to api service
    const {
      payload: { prepareBudgetRequestId },
    } = (await dispatch(seveFormCutOffPayService(formData))) as PayloadAction<SeveFormCutOffPayServiceResponse>;
    if (prepareBudgetRequestId) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });
      //close modal confirm
      setIsOpenConfirmModal(false);
      // clear form
      void dispatch(clearFormCutoffpay());
      //redirect to cut off pay form
      router.push(`${URL.reserve.cutOffPayDetail.url}?id=${prepareBudgetRequestId}`);
    }
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-paymentNo-label`}>
                    เลขที่คำสั่งจ่าย
                  </p>
                  <p className='text-display' id={`${dataTestId}-paymentNo-text`}>
                    {info.paymentNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-documentNo-label`}>
                    เลขที่เอกสาร
                  </p>
                  <p className='text-display' id={`${dataTestId}-documentNo-text`}>
                    {info.documentNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-payDate-label`}>
                    วันที่เตรียมจ่าย
                  </p>
                  <p className='text-display' id={`${dataTestId}-payDate-text`}>
                    {formatDateToCustom(info.payDate, format.buddhist.date)}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-paymentAgent-label`}>
                    ผู้เตรียมจ่าย
                  </p>
                  <p className='text-display' id={`${dataTestId}-paymentAgent-text`}>
                    {info.paymentAgent}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-beginningBalance-label`}>
                    ยอดยกมา (บาท)
                  </p>
                  <p className='text-display' id={`${dataTestId}-beginningBalance-text`}>
                    {formatCurrency(info.beginningBalance)}
                  </p>
                </div>
              </Col>
            </Row>
            <Divider className='my-0' />
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <p className='text-label-info' id={`${dataTestId}-bankName-label`}>
                  ธนาคาร
                </p>
                <p className='text-display' id={`${dataTestId}-bankName-text`}>
                  {info.bankName}
                </p>
              </Col>
              <Col {...formColumn}>
                <p className='text-label-info' id={`${dataTestId}-bankAccountNo-label`}>
                  เลขบัญชีธนาคาร
                </p>
                <p className='text-display' id={`${dataTestId}-bankAccountNo-text`}>
                  {formatBankAccountNo(info.bankAccountNo)}
                </p>
              </Col>
              <Col {...formColumn}>
                <p className='text-label-info' id={`${dataTestId}-chequeNo-label`}>
                  เลขที่เช็ค
                </p>
                <p className='text-display' id={`${dataTestId}-chequeNo-text`}>
                  {info.chequeNo}
                </p>
              </Col>
              <Col {...formColumn}>
                <p className='text-label-info' id={`${dataTestId}-chequeDate-label`}>
                  วันที่เช็ค
                </p>
                <p className='text-display' id={`${dataTestId}-chequeDate-text`}>
                  {dayjs(info.chequeDate).format('DD/MM/BBBB')}
                </p>
              </Col>
              <Col {...formColumn}>
                <p className='text-label-info' id={`${dataTestId}-receiveName-label`}>
                  ผู้รับเงิน
                </p>
                <p className='text-display' id={`${dataTestId}-receiveName-text`}>
                  {info.receiveName}
                </p>
              </Col>
              <Col {...formColumn}>
                <p className='text-label-info' id={`${dataTestId}-amount-label`}>
                  จำนวนเงิน (บาท)
                </p>
                <p className='text-display' id={`${dataTestId}-amount-text`}>
                  {formatCurrency(info.amount)}
                </p>
              </Col>
            </Row>
            <Divider className='my-0' />
            <Row gutter={[16, 16]}>
              <Col>
                <p className='text-label-info' id={`${dataTestId}-advancePaymentType-label`}>
                  ประเภทเบิกเงินรองจ่าย
                </p>
                <p className='text-display' id={`${dataTestId}-advancePaymentType-text`}>
                  {info.advancePaymentType}
                </p>
              </Col>
            </Row>
            <BaseForm
              onFinish={handleFormSubmit}
              initialValues={initialState.form}
              extraForm={form}
              name={'cutoffpay-form'}
            >
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <BaseItemDatePicker
                    id={`${dataTestId}-payDate-input-date`}
                    itemName='payDate'
                    label='วันที่ตัดจ่าย'
                    rules={[requiredRule('วันที่ตัดจ่าย')]}
                    value={info.payDate}
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-payer-input-text`}
                    itemName='payer'
                    label='ผู้ตัดจ่าย'
                    value={info.payer}
                    disabled
                  />
                </Col>
              </Row>
            </BaseForm>
          </div>
        </div>
        <div className='flex justify-center items-center gap-4'>
          <BaseButton
            size='middle'
            label='ยกเลิก'
            type='cancel'
            className='min-w-[250px] bg-[#dedede] hover:bg-red-500'
            onClick={() => router.push(URL.reserve.cutOffPay.url)}
          />

          <BaseButton size='middle' label='ตัดจ่าย' onClick={() => form.submit()} />
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL_PAY}prepare-budget-request/report/${prepareBudgetRequestId}`}
            target='_blank'
          >
            <BaseButton
              size='middle'
              label='พิมพ์หนังสือลงนามในเช็ค'
              className='!min-w-[280px]'
              icon={<PrinterOutlined />}
              onClick={() => console.log('print')}
            />
          </Link>

          <BaseDialog
            width='560px'
            isOpen={isOpenConfirmModal}
            setIsOpen={setIsOpenConfirmModal}
            content={
              <div className='flex flex-col w-full gap-4'>
                <div className='text-left font-semibold text-3xl'>บันทึกตัดจ่ายใช่หรือไม่?</div>
                <div className='text-left status text-[#4B5760]'>กรุณายืนยันการทำรายการอีกครั้ง</div>
              </div>
            }
            headerLeftIcon={
              <BaseIcon
                name='sendDollars'
                size='40px'
                classNameColor={{
                  base: 'text-primary',
                  hover: 'text-primary-bright',
                  active: 'text-secondary',
                  disabled: 'text-primary-very-bright',
                }}
                disabled={false}
                active={false}
              />
            }
            footer={
              <div className='flex justify-center gap-4'>
                <BaseButton size='large' type='cancel' label='ยกเลิก' onClick={() => setIsOpenConfirmModal(false)} />
                <BaseButton size='large' label='บันทึก' onClick={() => void handleConfirm()} />
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
