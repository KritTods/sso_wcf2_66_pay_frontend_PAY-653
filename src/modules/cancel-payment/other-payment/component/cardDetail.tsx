'use client';
import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { OtherPaymentDataType } from '@/store-redux/slices/cancel-payment/other-payment';
import { formatDayThai } from '@/utils/formatGeneral';
import { statusPayType } from '@/constants/statusSystem';
import { PayType } from '@/types/payType';

const CardDetail = (props: OtherPaymentDataType & { dataTestId: string }): React.ReactElement => {
  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className='header-card'> รายละเอียด</p>
        <Row gutter={[16, 16]}>
          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-documentNo-label-title`} className='text-label-info'>
                เลขที่เอกสาร
              </p>
              <p id={`${props.dataTestId}-documentNo-label-value`} className='text-display'>
                {props.documentNo}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-paymentNo-label-title`} className='text-label-info'>
                เลขที่คำสั่งจ่าย
              </p>
              <p id={`${props.dataTestId}-paymentNo-label-value`} className='text-display'>
                {props.paymentNo}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-pamentAgent-label-title`} className='text-label-info'>
                ผู้เตรียมจ่าย
              </p>
              <p id={`${props.dataTestId}-pamentAgent-label-value`} className='text-display'>
                {props.pamentAgent}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-transactionDate-label-title`} className='text-label-info'>
                วันที่เตรียมจ่าย
              </p>
              <p id={`${props.dataTestId}-transactionDate-label-value`} className='text-display'>
                {formatDayThai(props.transactionDate)}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-payType-label-title`} className='text-label-info'>
                วิธีการชำระเงิน
              </p>
              <p id={`${props.dataTestId}-payType-label-value`} className='text-display'>
                {statusPayType[props.payType as PayType]}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-bookNo-label-title`} className='text-label-info'>
                เลขที่หนังสือ รง.
              </p>
              <p id={`${props.dataTestId}-bookNo-label-value`} className='text-display'>
                {props.bookNo}
              </p>
            </div>
          </Col>

          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-receiverName-label-title`} className='text-label-info'>
                ชื่อผู้มีสิทธิ์
              </p>
              <p id={`${props.dataTestId}-receiverName-label-value`} className='text-display'>
                {props.receiverName}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${props.dataTestId}-paymentType-label-title`} className='text-label-info'>
                ประเภทการจ่ายนอกระบบ
              </p>
              <p id={`${props.dataTestId}-paymentType-label-value`} className='text-display'>
                {props.paymentType}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardDetail;
