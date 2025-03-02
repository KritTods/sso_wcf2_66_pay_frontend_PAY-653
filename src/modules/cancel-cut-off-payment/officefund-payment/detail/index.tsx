'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { Col, Row } from 'wcf-component-lib/node_modules/antd';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  cancelCutOffPayOfficeFundSelector,
  getcancelCutOffPayOfficeFundDetailService,
  OfficeFundDataDetailType,
  setPageDetail,
} from '@/store-redux/slices/cancel-cut-off-payment/officefund-payment';
import CardPreparePay from '@/components/common/cardPreparePay';
import { useSelector } from 'react-redux';

import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import { formColumn } from '@/constants/layoutColumn';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import CollapseCustoms from '@/modules/cancel-payment/officefund-payment/component/collapse';

export default function OfficefundPaymentDetail(): React.ReactElement {
  const dataTestId = 'pageCancelCutoffPaymentOfficeFundDetail';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelCutOffPayOfficeFundSelector);

  const pageDetailRef = useRef(pageDetail);

  useEffect(() => {
    if (!id) return;

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(
        getcancelCutOffPayOfficeFundDetailService(id),
      )) as PayloadAction<OfficeFundDataDetailType>;

      if (payload) {
        const dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: payload.cardConsider?.status || '',
          significantNo: payload.cardConsider?.significantNo || undefined,
          significantHandNo: payload.cardConsider?.significantHandNo || undefined,
        };

        const newPageForm = {
          ...payload,
          cardConsider: {
            ...dataCardConsider,
          },
        };

        if (JSON.stringify(newPageForm) !== JSON.stringify(pageDetailRef.current)) {
          pageDetailRef.current = newPageForm; // อัปเดต ref
          void dispatch(setPageDetail(newPageForm));
        }
      }
    };

    void fetchData();
  }, [dispatch, id]);

  const dataCardConsideration = useMemo(() => {
    const data: CardConsiderType = {
      payDate: pageDetail.cardConsider?.payDate || '', // ให้เป็นค่าว่างถ้า undefined
      payer: pageDetail.cardConsider?.payer || '', // ให้เป็นค่าว่างถ้า undefined
      significantNo: pageDetail.cardConsider?.significantNo || '-', // เลขที่ใบสำคัญรับเงิน
      significantHandNo: pageDetail.cardConsider?.significantHandNo || '-', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
      status: pageDetail.cardConsider?.status || '', // ให้เป็นค่าว่างถ้า undefined
    };

    return data;
  }, [pageDetail]);

  const dataCardPreparePay = useMemo(() => {
    if (!pageDetail.cardPreparePay?.payType) return;

    return {
      documentNo: pageDetail.cardPreparePay?.documentNo || '',
      paymentNo: pageDetail.cardPreparePay?.paymentNo || '',
      paymentAgent: pageDetail.cardPreparePay?.paymentAgent || '',
      transactionDate: pageDetail.cardPreparePay?.transactionDate,
    };
  }, [pageDetail.cardPreparePay]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col rounded-xl gap-4 mx-4 mb-6'>
      {dataCardConsideration && <CardConsider dataTestId={dataTestId} data={dataCardConsideration} />}
      {dataCardPreparePay && <CardPreparePay isNotShadow dataTestId={dataTestId} data={dataCardPreparePay} />}

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
                    {pageDetail.noticeName}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-noticeAmount-label-title`} className='text-label-info'>
                    จำนวนเงินจ่ายตามประกาศ (บาท)
                  </p>
                  <p id={`${dataTestId}-noticeAmount-label-value`} className='text-display'>
                    {formatCurrency(pageDetail.noticeAmount)}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-creditBalance-label-title`} className='text-label-info'>
                    จำนวนเงินคงเหลือตามประกาศ (บาท)
                  </p>
                  <p id={`${dataTestId}-creditBalance-label-value`} className='text-display'>
                    {formatCurrency(pageDetail.creditBalance)}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* รายการ งวดที่ */}
      {pageDetail.carddueInstallment.map((item, index) => {
        return (
          <div key={index}>
            <CollapseCustoms
              title={`งวดที่ : ${item.dueInstallment}`}
              collapseKey={item.dueInstallment} // ส่ง collapseKey เพื่อใช้แทน key ใน component
              key={item.dueInstallment} // ใช้ key สำหรับ React rendering
              type='detail'
              isDefaultOpen={index === pageDetail.carddueInstallment.length - 1}
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
                    {item.accountName_1}
                  </p>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className='my-5'>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-chequeNo1-label-title`} className='text-label-info'>
                    เลขที่เช็ค
                  </p>
                  <p id={`${dataTestId}-chequeNo1-label-value`} className='text-display text-black'>
                    {item.chequeNo_1}
                  </p>
                </Col>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-amount1-label-title`} className='text-label-info'>
                    จำนวนเงิน (บาท)
                  </p>
                  <p id={`${dataTestId}-amount1-label-value`} className='text-display text-black'>
                    {formatCurrency(item.amount_1)}
                  </p>
                </Col>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-chequeBankDigitCode1-label-title`} className='text-label-info'>
                    ธนาคาร
                  </p>
                  <p id={`${dataTestId}-chequeBankDigitCode1-label-value`} className='text-display text-black'>
                    {item.bank_1.code} : {item.bank_1.name}
                  </p>
                </Col>
              </Row>
              {/* // แสดงข้อมูลเฉพาะเมื่อมีข้อมูลบัญชีสั่งจ่าย : 2 */}
              {item.accountName_2 !== '' && item.chequeNo_2 !== '' && item.bank_2.code !== '' && (
                <>
                  <hr className='my-5' />
                  <Row gutter={[16, 16]} className='my-5'>
                    <Col lg={24}>
                      <p id={`${dataTestId}-accountName2-label-title`} className='text-label-info'>
                        ชื่อบัญชีสั่งจ่าย : 2
                      </p>
                      <p id={`${dataTestId}-accountName2-label-value`} className='text-display text-black'>
                        {item.accountName_2}
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} className='my-5'>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-chequeNo2-label-title`} className='text-label-info'>
                        เลขที่เช็ค
                      </p>
                      <p id={`${dataTestId}-chequeNo2-label-value`} className='text-display text-black'>
                        {item.chequeNo_2}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-amount2-label-title`} className='text-label-info'>
                        จำนวนเงิน (บาท)
                      </p>
                      <p id={`${dataTestId}-amount2-label-value`} className='text-display text-black'>
                        {formatCurrency(item.amount_2)}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-chequeBankDigitCode2-label-title`} className='text-label-info'>
                        ธนาคาร
                      </p>
                      <p id={`${dataTestId}-chequeBankDigitCode2-label-value`} className='text-display text-black'>
                        {item.bank_2.code} : {item.bank_2.name}
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
          onClick={() => router.push(URL.cancelCutOffPayment.cancelCutOffOfficeFundPayment.url)}
        />
      </div>
    </div>
  );
}
