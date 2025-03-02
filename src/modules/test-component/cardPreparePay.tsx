'use client';
import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { BaseForm } from 'wcf-component-lib/src/components';
import { formColumn } from '@/constants/layoutColumn';
import { AdvancePaymentType, IncorrectPaymentReasonType, PayType } from '@/types/payType';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { statusAdvancePaymentType, statusIncorrectPaymentReason, statusPayType } from '@/constants/statusSystem';

export interface CardPrepareProp {
  dataTestId: string;
  data: CardPrepareType;
}

export interface CardPrepareType {
  documentNo: string; // เลขที่เอกสาร   common
  paymentNo?: string; // เลขที่ใบสั่งจ่าย
  paymentAgent: string; // ผู้ตเตรียมจ่าย   common
  transactionDate: string; // วันที่เตรียมจ่าย   common
  payType: PayType; // ประเภทการจ่าย   common
  bookNo?: string; // เลขที่หนังสือ รง.
  receiverName?: string; // ชื่อผู้มีสิทธิ์
  paymentType?: string; // ประเภทการจ่ายนอกระบบ***
  advancePaymentType?: AdvancePaymentType; // ประเภทการจ่าย/รับ
  incorrectPaymentReason?: IncorrectPaymentReasonType; // สาเหตุการจ่ายผิด
  employeeCitizenId?: string; // หมายเลขบัตรประชาชน
  employeeName?: string; // ชื่อ-นามสกุล
  accountNo?: string; //  ชื่อสถานประกอบการ
  paymentRequest?: string; // จ่ายคืนให้
  amount?: number; // จำนวนเงิน
}

const CardPreparePay = ({ dataTestId, data }: CardPrepareProp): React.ReactElement => {
  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <BaseForm>
        <div className='flex flex-col gap-4'>
          <p className='header-card'>ข้อมูลเตรียมจ่าย</p>
          <Row gutter={[16, 16]}>
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardTax-documentNo-label-title`} className='text-label-info'>
                  เลขที่เอกสาร
                </p>
                <p id={`${dataTestId}-cardTax-documentNo-label-value`} className='text-display'>
                  {data.documentNo}
                </p>
              </div>
            </Col>
            {data.paymentNo && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-paymentNo-label-title`} className='text-label-info'>
                    เลขที่คำสั่งจ่าย
                  </p>
                  <p id={`${dataTestId}-cardHeader-paymentNo-label-value`} className='text-display'>
                    {data.paymentNo}
                  </p>
                </div>
              </Col>
            )}

            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardTax-paymentAgent-label-title`} className='text-label-info'>
                  ผู้เตรียมจ่าย
                </p>
                <p id={`${dataTestId}-cardTax-paymentAgent-label-value`} className='text-display'>
                  {data.paymentAgent}
                </p>
              </div>
            </Col>
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardTax-transactionDate-label-title`} className='text-label-info'>
                  วันที่เตรียมจ่าย
                </p>
                <p id={`${dataTestId}-cardTax-transactionDate-label-value`} className='text-display'>
                  {formatDayThai(data.transactionDate)}
                </p>
              </div>
            </Col>
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardTax-payType-label-title`} className='text-label-info'>
                  วิธีการชำระเงิน
                </p>
                <p id={`${dataTestId}-cardTax-payType-label-value`} className='text-display'>
                  {statusPayType[data.payType]}
                </p>
              </div>
            </Col>
            {data.bookNo && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-bookNo-label-title`} className='text-label-info'>
                    เลขที่หนังสือ รง.
                  </p>
                  <p id={`${dataTestId}-cardHeader-bookNo-label-value`} className='text-display'>
                    {data.bookNo}
                  </p>
                </div>
              </Col>
            )}
            {data.receiverName && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-receiverName-label-title`} className='text-label-info'>
                    ชื่อผู้มีสิทธิ์
                  </p>
                  <p id={`${dataTestId}-cardHeader-receiverName-label-value`} className='text-display'>
                    {data.receiverName}
                  </p>
                </div>
              </Col>
            )}
            {data.paymentType && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-paymentType-label-title`} className='text-label-info'>
                    ประเภทการจ่ายนอกระบบ
                  </p>
                  <p id={`${dataTestId}-cardHeader-paymentType-label-value`} className='text-display'>
                    {data.paymentType}
                  </p>
                </div>
              </Col>
            )}
            {data.advancePaymentType && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-advancePaymentType-label-title`} className='text-label-info'>
                    ประเภทการจ่าย/รับ
                  </p>
                  <p id={`${dataTestId}-cardHeader-advancePaymentType-label-value`} className='text-display'>
                    {statusAdvancePaymentType[data.advancePaymentType]}
                  </p>
                </div>
              </Col>
            )}
            {data.incorrectPaymentReason && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-incorrectPaymentReason-label-title`} className='text-label-info'>
                    สาเหตุการจ่ายผิด
                  </p>
                  <p id={`${dataTestId}-cardHeader-incorrectPaymentReason-label-value`} className='text-display'>
                    {data.incorrectPaymentReason} : {statusIncorrectPaymentReason[data.incorrectPaymentReason]}
                  </p>
                </div>
              </Col>
            )}

            {data.employeeCitizenId && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-employeeCitizenId-label-title`} className='text-label-info'>
                    หมายเลขบัตรประชาชน
                  </p>
                  <p id={`${dataTestId}-cardHeader-employeeCitizenId-label-value`} className='text-display'>
                    {data.employeeCitizenId}
                  </p>
                </div>
              </Col>
            )}
            {data.employeeName && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-employeeName-label-title`} className='text-label-info'>
                    ชื่อ-นามสกุล
                  </p>
                  <p id={`${dataTestId}-cardHeader-employeeName-label-value`} className='text-display'>
                    {data.employeeName}
                  </p>
                </div>
              </Col>
            )}
            {data.accountNo && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-accountNo-label-title`} className='text-label-info'>
                    ชื่อสถานประกอบการ
                  </p>
                  <p id={`${dataTestId}-cardHeader-accountNo-label-value`} className='text-display'>
                    {data.accountNo}
                  </p>
                </div>
              </Col>
            )}
            {data.paymentRequest && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-paymentRequest-label-title`} className='text-label-info'>
                    จ่ายคืนให้
                  </p>
                  <p id={`${dataTestId}-cardHeader-paymentRequest-label-value`} className='text-display'>
                    {data.paymentRequest}
                  </p>
                </div>
              </Col>
            )}
            {data.amount && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardHeader-amount-label-title`} className='text-label-info'>
                    จำนวนเงิน(บาท)
                  </p>
                  <p id={`${dataTestId}-cardHeader-amount-label-value`} className='text-display'>
                    {formatCurrency(data.amount)}
                  </p>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </BaseForm>
    </div>
  );
};

export default CardPreparePay;
