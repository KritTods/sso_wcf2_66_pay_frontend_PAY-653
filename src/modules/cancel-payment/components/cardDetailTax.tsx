'use client';
import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { formatCurrency } from '@/utils/formatGeneral';
import { CardTaxType } from '@/store-redux/slices/cancel-payment/hospital-payment';

export interface CardDetailTaxType {
  dataTestId: string;
  data: CardTaxType;
}

const CardDetailTax = ({ dataTestId, data }: CardDetailTaxType): React.ReactElement => {
  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className='header-card'>จ่ายภาษี</p>
        <Row gutter={[16, 16]}>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardTax-hospitalName-label-title`} className='text-label-info'>
                {data.hospitalName}
              </p>
              <p id={`${dataTestId}-cardTax-amount-label-value`} className='text-display'>
                {formatCurrency(data.amount)}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardTax-vat-label-title`} className='text-label-info'>
                หักภาษี ณ ที่จ่าย (%)
              </p>
              <p id={`${dataTestId}-cardTax-vat-label-value`} className='text-display'>
                {data.vat}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardTax-vat-totalVat-title`} className='text-label-info'>
                รวมภาษี
              </p>
              <p id={`${dataTestId}-cardTax-vat-totalVat-value`} className='text-display'>
                {formatCurrency(data.totalVat)}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardTax-vat-totalAmount-title`} className='text-label-info'>
                รวมเป็นเงิน
              </p>
              <p id={`${dataTestId}-cardTax-vat-totalAmount-value`} className='text-display'>
                {formatCurrency(data.totalAmount)}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardDetailTax;
