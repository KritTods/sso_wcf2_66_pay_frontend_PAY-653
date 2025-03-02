'use client';

import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { statusAdvancePaymentType, statusIncorrectPaymentReason, statusPayType } from '@/constants/statusSystem';
import { IncorrectPaymentReasonType, PayType } from '@/types/payType';

export interface WrongFundDataType {
  id: string;
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  paymentAgent: string; // ผู้เตรียมจ่าย
  payType: PayType; //วิธีการชำระเงิน
  advancePaymentType: string; // ประเภทเบิกเงินรองจ่าย/รับ
  incorrectPaymentReason: IncorrectPaymentReasonType; // สาเหตุการจ่ายเงินผิด
  accountNo: string; //เลขที่บัญชีนายจ้าง
  employeeCitizenId: string; //เลขที่บัตรประชาชน
  employeeName: string; //ชื่อ-สกุล
  amount: number; // จำนวนเงิน
  paymentRequest: string; // จ่ายคืนให้
}

interface CardDetailProps {
  dataTestId: string;
  data: WrongFundDataType;
}

const CardDetailWrongFundPayment = ({ dataTestId, data }: CardDetailProps): React.ReactElement => {
  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className='header-card'>รายละเอียด</p>
        <Row gutter={[16, 16]}>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardHeader-documentNo-label-title`} className='text-label-info'>
                เลขที่เอกสาร
              </p>
              <p id={`${dataTestId}-cardHeader-documentNo-label-value`} className='text-display'>
                {data.documentNo}
              </p>
            </div>
          </Col>

          {data.advancePaymentType === 'PAY' && (
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
              <p id={`${dataTestId}-cardHeader-paymentAgent-label-title`} className='text-label-info'>
                ผู้เตรียมจ่าย
              </p>
              <p id={`${dataTestId}-cardHeader-paymentAgent-label-title`} className='text-display'>
                {data.paymentAgent}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardHeader-transactionDate-label-title`} className='text-label-info'>
                วันที่เตรียมจ่าย
              </p>
              <p id={`${dataTestId}-cardHeader-transactionDate-label-value`} className='text-display'>
                {formatDayThai(data.transactionDate)}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardHeader-payType-label-title`} className='text-label-info'>
                วิธีการชำระเงิน
              </p>
              <p id={`${dataTestId}-cardHeader-payType-label-value`} className='text-display'>
                {statusPayType[data.payType]}
              </p>
            </div>
          </Col>
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
          {data.advancePaymentType === 'PAY' && (
            <>
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

              {data.incorrectPaymentReason === 'O' && (
                <>
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
                </>
              )}

              {data.incorrectPaymentReason === 'S' && (
                <>
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
                </>
              )}

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
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CardDetailWrongFundPayment;
