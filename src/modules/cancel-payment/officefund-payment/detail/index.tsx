'use client';
import React, { useEffect, useMemo } from 'react';
import { Col, Row } from 'wcf-component-lib/node_modules/antd';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { formColumn } from '@/constants/layoutColumn';
import { URL } from '@/constants/configPage';
import { useRouter, useSearchParams } from 'next/navigation';
import CollapseCustoms from '@/modules/cancel-payment/officefund-payment/component/collapse';
import {
  cancelOfficeFundSelector,
  getOfficeFundDetailService,
} from '@/store-redux/slices/cancel-payment/officefund-payment';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store-redux/store';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';

export default function OfficefundPaymentDetail(): React.ReactElement {
  const dataTestId = 'pageCancelOfficeFundPaymentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelOfficeFundSelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getOfficeFundDetailService(id));
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
                    เลขที่คำสั่งจ่าย
                  </p>
                  <p id={`${dataTestId}-paymentNo-label-value`} className='text-display'>
                    {dataSource.paymentNo}
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
            </Row>
          </div>
        </div>
      </div>

      {/* บันทึกข้อมูล */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>บันทึกข้อมูล</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-noticeName-label-title`} className='text-label-info'>
                    จ่ายตามประกาศฉบับที่
                  </p>
                  <p id={`${dataTestId}-noticeName-label-value`} className='text-display'>
                    {dataSource.noticeName}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-noticeAmount-label-title`} className='text-label-info'>
                    จำนวนเงินจ่ายตามประกาศ (บาท)
                  </p>
                  <p id={`${dataTestId}-noticeAmount-label-value`} className='text-display'>
                    {formatCurrency(dataSource.noticeAmount)}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-creditBalance-label-title`} className='text-label-info'>
                    จำนวนเงินคงเหลือตามประกาศ (บาท)
                  </p>
                  <p id={`${dataTestId}-creditBalance-label-value`} className='text-display'>
                    {formatCurrency(dataSource.creditBalance)}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* รายการ งวดที่ */}
      {dataSource.details.map((item, index) => {
        return (
          <div key={index}>
            <CollapseCustoms
              title={`งวดที่ : ${item.dueInstallment}`}
              collapseKey={item.dueInstallment} // ส่ง collapseKey เพื่อใช้แทน key ใน component
              key={item.dueInstallment} // ใช้ key สำหรับ React rendering
              type='detail'
              isDefaultOpen={index === dataSource.details.length - 1}
            >
              <Row gutter={[16, 16]} className='my-5'>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-bookNo-label-title`} className='text-label-info'>
                    เลขที่หนังสือ รง.
                  </p>
                  <p id={`${dataTestId}-bookNo-label-value`} className='text-display text-black'>
                    {item.bookNo}
                  </p>
                </Col>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-approveName-label-title`} className='text-label-info'>
                    ผู้อนุมัติสั่งจ่าย
                  </p>
                  <p id={`${dataTestId}-approveName-label-value`} className='text-display text-black'>
                    {item.approveName}
                  </p>
                </Col>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-approveName-label-title`} className='text-label-info'>
                    วันที่หนังสือ
                  </p>
                  <p id={`${dataTestId}-approveName-label-value`} className='text-display text-black'>
                    {formatDayThai(item.bookDate)}
                  </p>
                </Col>
              </Row>
              <hr className='my-5' />
              <Row gutter={[16, 16]} className='my-5'>
                <Col lg={24}>
                  <p id={`${dataTestId}-accountName1-label-title`} className='text-label-info'>
                    ชื่อบัญชีสั่งจ่าย : 1
                  </p>
                  <p id={`${dataTestId}-accountName1-label-value`} className='text-display text-black'>
                    {item.accountName1}
                  </p>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className='my-5'>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-chequeNo1-label-title`} className='text-label-info'>
                    เลขที่เช็ค
                  </p>
                  <p id={`${dataTestId}-chequeNo1-label-value`} className='text-display text-black'>
                    {item.chequeNo1}
                  </p>
                </Col>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-amount1-label-title`} className='text-label-info'>
                    จำนวนเงิน (บาท)
                  </p>
                  <p id={`${dataTestId}-amount1-label-value`} className='text-display text-black'>
                    {formatCurrency(item.amount1)}
                  </p>
                </Col>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-chequeBankDigitCode1-label-title`} className='text-label-info'>
                    ธนาคาร
                  </p>
                  <p id={`${dataTestId}-chequeBankDigitCode1-label-value`} className='text-display text-black'>
                    {item.chequeBankDigitCode1}
                  </p>
                </Col>
              </Row>
              {/* // แสดงข้อมูลเฉพาะเมื่อมีข้อมูลบัญชีสั่งจ่าย : 2 */}
              {item.accountName2 !== '' && item.chequeNo2 !== '' && item.chequeBankDigitCode2 !== '' && (
                <>
                  <hr className='my-5' />
                  <Row gutter={[16, 16]} className='my-5'>
                    <Col lg={24}>
                      <p id={`${dataTestId}-accountName2-label-title`} className='text-label-info'>
                        ชื่อบัญชีสั่งจ่าย : 2
                      </p>
                      <p id={`${dataTestId}-accountName2-label-value`} className='text-display text-black'>
                        {item.accountName2}
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} className='my-5'>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-chequeNo2-label-title`} className='text-label-info'>
                        เลขที่เช็ค
                      </p>
                      <p id={`${dataTestId}-chequeNo2-label-value`} className='text-display text-black'>
                        {item.chequeNo2}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-amount2-label-title`} className='text-label-info'>
                        จำนวนเงิน (บาท)
                      </p>
                      <p id={`${dataTestId}-amount2-label-value`} className='text-display text-black'>
                        {formatCurrency(item.amount2)}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-chequeBankDigitCode2-label-title`} className='text-label-info'>
                        ธนาคาร
                      </p>
                      <p id={`${dataTestId}-chequeBankDigitCode2-label-value`} className='text-display text-black'>
                        {item.chequeBankDigitCode2}
                      </p>
                    </Col>
                  </Row>
                </>
              )}
            </CollapseCustoms>
          </div>
        );
      })}

      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelPayment.cancelOfficeFundPayment.url)}
        />
      </div>
    </div>
  );
}
