'use client';

import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { formatDayThai } from '@/utils/formatGeneral';
import { statusPayType } from '@/constants/statusSystem';
import { PayType } from '@/types/payType';

export interface CardDetailType {
  dataTestId: string;
  data: {
    documentNo: string; //เลขที่เอกสาร
    username: string;
    transactionDate: string; // วันที่เตรียมจ่าย
    payType: PayType; //ประเภทการจ่ายเงิน
  };
}

const CardDetail = ({ dataTestId, data }: CardDetailType): React.ReactElement => {
  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className='header-card'>รายละเอียด</p>
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
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardTax-username-label-title`} className='text-label-info'>
                ผู้เตรียมจ่าย
              </p>
              <p id={`${dataTestId}-cardTax-username-label-value`} className='text-display'>
                {data.username}
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
        </Row>
      </div>
    </div>
  );
};

export default CardDetail;
