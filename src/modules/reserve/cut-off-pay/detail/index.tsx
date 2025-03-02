'use client';
import React, { useEffect } from 'react';
import { Col, Row, Divider } from 'wcf-component-lib/node_modules/antd';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { URL } from '@/constants/configPage';
import Link from 'next/link';
import { PrinterOutlined } from '@ant-design/icons';
import { searchColumn } from '@/constants/layoutColumn';
import { formatDateToCustom } from 'wcf-component-lib/src/utils';
import { format } from 'wcf-component-lib/src/constants/dayjsFormat';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { cutOffPaySelector, getPrepareBudgetService } from '@/store-redux/slices/reserve/cut-off-pay';
import { formatCurrency } from '@/utils/formatGeneral';
import dayjs from '@/utils/dayjs-setup-th';

export default function CutOffPayDetail(): React.ReactElement {
  const { info, loading } = useSelector(cutOffPaySelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const prepareBudgetRequestId = searchParams.get('id');

  const dataTestId = 'page-cutoffpay-detail';

  //ดึงข้อมูลบันทึกรายละเอียดตัดจ่าย (getPrepareBudgetService)
  useEffect(() => {
    if (!prepareBudgetRequestId) return;
    //Call API Thunks
    void dispatch(getPrepareBudgetService(prepareBudgetRequestId));
  }, [dispatch, prepareBudgetRequestId]);

  //loading form
  if (loading) {
    return <BaseLoading size='default' />;
  }

  // ฟังก์ชันสำหรับจัดรูปแบบเลขบัญชี
  const formatBankAccountNo = (accountNo: string): string => {
    if (!accountNo || accountNo.length !== 10) {
      return accountNo; // ถ้าเลขบัญชีไม่ครบ 12 หลัก จะคืนค่าเดิม
    }

    return `${accountNo.substring(0, 3)}-${accountNo.substring(3, 4)}-${accountNo.substring(
      4,
      9,
    )}-${accountNo.substring(9, 10)}`;
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...searchColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-paymentNo-label`}>
                    เลขที่คำสั่งจ่าย
                  </p>
                  <p className='text-display' id={`${dataTestId}-paymentNo-text`}>
                    {info.paymentNo}
                  </p>
                </div>
              </Col>
              <Col {...searchColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-documentNo-label`}>
                    เลขที่เอกสาร
                  </p>
                  <p className='text-display' id={`${dataTestId}-documentNo-text`}>
                    {info.documentNo}
                  </p>
                </div>
              </Col>
              <Col {...searchColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-payDate-label`}>
                    วันที่เตรียมจ่าย
                  </p>
                  <p className='text-display' id={`${dataTestId}-payDate-text`}>
                    {formatDateToCustom(info.payDate, format.buddhist.date)}
                  </p>
                </div>
              </Col>
              <Col {...searchColumn}>
                <div>
                  <p className='text-label-info' id={`${dataTestId}-paymentAgent-label`}>
                    ผู้เตรียมจ่าย
                  </p>
                  <p className='text-display' id={`${dataTestId}-paymentAgent-text`}>
                    {info.paymentAgent}
                  </p>
                </div>
              </Col>
              <Col {...searchColumn}>
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
              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-bankName-label`}>
                  ธนาคาร
                </p>
                <p className='text-display' id={`${dataTestId}-bankName-text`}>
                  {info.bankName}
                </p>
              </Col>
              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-bankAccountNo-label`}>
                  เลขบัญชีธนาคาร
                </p>
                <p className='text-display' id={`${dataTestId}-bankAccountNo-text`}>
                  {formatBankAccountNo(info.bankAccountNo)}
                </p>
              </Col>
              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-chequeNo-label`}>
                  เลขที่เช็ค
                </p>
                <p className='text-display' id={`${dataTestId}-chequeNo-text`}>
                  {info.chequeNo}
                </p>
              </Col>

              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-chequeDate-label`}>
                  วันที่เช็ค
                </p>
                <p className='text-display' id={`${dataTestId}-chequeDate-text`}>
                  {dayjs(info.chequeDate).format('DD/MM/BBBB')}
                </p>
              </Col>
              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-receiveName-label`}>
                  ผู้รับเงิน
                </p>
                <p className='text-display' id={`${dataTestId}-receiveName-text`}>
                  {info.receiveName}
                </p>
              </Col>
              <Col {...searchColumn}>
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
              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-advancePaymentType-label`}>
                  ประเภทเบิกเงินรองจ่าย
                </p>
                <p className='text-display' id={`${dataTestId}-advancePaymentType-text`}>
                  {info.advancePaymentType}
                </p>
              </Col>
              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-payDate-label`}>
                  วันที่ตัดจ่าย
                </p>
                <p className='text-display' id={`${dataTestId}-payDate-text`}>
                  {formatDateToCustom(info.payDate, format.buddhist.date)}
                </p>
              </Col>
              <Col {...searchColumn}>
                <p className='text-label-info' id={`${dataTestId}-payer-label`}>
                  ผู้ตัดจ่าย
                </p>
                <p className='text-display' id={`${dataTestId}-payer-text`}>
                  {info.payer}
                </p>
              </Col>
            </Row>
          </div>
        </div>
        <div className='flex justify-center items-center gap-4'>
          <BaseButton
            size='middle'
            type='cancel'
            label='ยกเลิก'
            className='bg-[#dedede] hover:bg-red-500'
            onClick={() => router.push(URL.reserve.cutOffPay.url)}
          />
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
        </div>
      </div>
    </>
  );
}
