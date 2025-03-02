'use client';
import React, { useEffect, useMemo } from 'react';
import { Col, Row } from 'wcf-component-lib/node_modules/antd';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { formColumn } from '@/constants/layoutColumn';
import { URL } from '@/constants/configPage';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  cancelReservePaymentSelector,
  getReservePaymentDetailService,
} from '@/store-redux/slices/cancel-payment/reserve-payment';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store-redux/store';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';

export default function ReservePaymentDetail(): React.ReactElement {
  const dataTestId = 'pageCancelReservePaymentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelReservePaymentSelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getReservePaymentDetailService(id));
  }, [dispatch, id]);

  const dataSource = useMemo(() => {
    return pageDetail;
  }, [pageDetail]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col rounded-xl gap-4 mx-4 mb-6'>
      <div className='flex flex-col justify-center items-center '>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-documentNo-label-title`} className='text-label-info'>
                    เลขที่เอกสาร
                  </p>
                  <p id={`${dataTestId}-documentNo-label-value`} className='text-display'>
                    {dataSource.documentNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-paymentNo-label-title`} className='text-label-info'>
                    เลขที่ใบสั่งจ่าย
                  </p>
                  <p id={`${dataTestId}-paymentNo-label-value`} className='text-display'>
                    {dataSource.paymentNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-transactionDate-label-title`} className='text-label-info'>
                    วันที่เตรียมจ่าย
                  </p>
                  <p id={`${dataTestId}-transactionDate-label-value`} className='text-display'>
                    {formatDayThai(dataSource.transactionDate)}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-paymentAgent-label-title`} className='text-label-info'>
                    ผู้เตรียมจ่าย
                  </p>
                  <p id={`${dataTestId}-paymentAgent-label-value`} className='text-display'>
                    {dataSource.paymentAgent}
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-beginningBalance-label-title`} className='text-label-info'>
                    ยอดยกมา (บาท)
                  </p>
                  <p id={`${dataTestId}-beginningBalance-label-value`} className='text-display'>
                    {formatCurrency(dataSource.beginningBalance)}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* บันทึกข้อมูล */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            {/* <p className='header-card'>บันทึกข้อมูล</p> */}
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-noticeName-label-title`} className='text-label-info'>
                    ธนาคาร
                  </p>
                  <p id={`${dataTestId}-noticeName-label-value`} className='text-display'>
                    {dataSource.bankCode}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-noticeAmount-label-title`} className='text-label-info'>
                    เลขที่บัญชีธนาคาร
                  </p>
                  <p id={`${dataTestId}-noticeAmount-label-value`} className='text-display'>
                    {dataSource.accountNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-chequeNo-label-title`} className='text-label-info'>
                    เลขที่เช็ค
                  </p>
                  <p id={`${dataTestId}-chequeNo-label-value`} className='text-display'>
                    {dataSource.chequeNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-creditBalance-label-title`} className='text-label-info'>
                    วันที่เช็ค
                  </p>
                  <p id={`${dataTestId}-creditBalance-label-value`} className='text-display'>
                    {dataSource.chequeDate}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-recieveName-label-title`} className='text-label-info'>
                    ผู้รับเงิน
                  </p>
                  <p id={`${dataTestId}-recieveName-label-value`} className='text-display'>
                    {dataSource.recieveName}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-amount-label-title`} className='text-label-info'>
                    จำนวนเงิน (บาท)
                  </p>
                  <p id={`${dataTestId}-amount-label-value`} className='text-display'>
                    {formatCurrency(dataSource.amount)}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            {/* <p className='header-card'>บันทึกข้อมูล</p> */}
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-advancePaymentType-label-title`} className='text-label-info'>
                    ประเภทเบิกเงินรองจ่าย
                  </p>
                  <p id={`${dataTestId}-advancePaymentType-label-value`} className='text-display'>
                    {dataSource.advancePaymentType}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelPayment.cancelReservePayment.url)}
        />
      </div>
    </div>
  );
}
