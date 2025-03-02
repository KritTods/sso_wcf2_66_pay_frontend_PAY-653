'use client';
import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { formatCurrency } from '@/utils/formatGeneral';
import { BaseItemInputNumber } from 'wcf-component-lib/src/components';
import { requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

export interface DataTaxType {
  taxHotpitalName: string;
  taxAmount: number;
  taxPercent: number;
  taxAmountAfterCalTax: number;
  taxTotalAmountAfterCalTax: number;
}

export interface CardDetailTaxType {
  dataTestId: string;
  data: DataTaxType;
  mode: 'view' | 'input';
  callBackTaxPercent?: (value: number) => void;
}

const CardDetailTax = ({
  dataTestId,
  data,
  mode = 'view',
  callBackTaxPercent,
}: CardDetailTaxType): React.ReactElement => {
  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className='header-card'>จ่ายภาษี</p>
        <Row gutter={[16, 16]}>
          <Col {...formColumn}>
            {mode === 'view' && (
              <div>
                <p id={`${dataTestId}-cardTax-hospitalName-label-title`} className='text-label-info'>
                  {data.taxHotpitalName || 'ไม่พบโรงพยาบาลจากรายการสั่งจ่าย'}
                </p>
                <p id={`${dataTestId}-cardTax-amount-label-value`} className='text-display'>
                  {formatCurrency(data.taxAmount)}
                </p>
              </div>
            )}
            {mode === 'input' && (
              <BaseItemInputNumber
                label={data.taxHotpitalName || 'ไม่พบโรงพยาบาลจากรายการสั่งจ่าย'}
                className='w-full'
                hideFieldControl
                itemName={'taxAmount'}
                id={`${dataTestId}-cardTax-amount-input`}
                disabled
              />
            )}
          </Col>
          <Col {...formColumn}>
            {mode === 'view' && (
              <div>
                <p id={`${dataTestId}-cardTax-vat-label-title`} className='text-label-info'>
                  หักภาษี ณ ที่จ่าย (%)
                </p>
                <p id={`${dataTestId}-cardTax-vat-label-value`} className='text-display'>
                  {data.taxPercent}
                </p>
              </div>
            )}

            {mode === 'input' && (
              <BaseItemInputNumber
                label='หักภาษี ณ ที่จ่าย (%)'
                itemName={'taxPercent'}
                className='text-right w-full'
                decimalDigit={0}
                hideFieldControl
                onChangeFunction={(e): void => {
                  const value = e.target.value;
                  if (value && (value == '0' || value == '1')) {
                    callBackTaxPercent && callBackTaxPercent(Number(value));
                  }
                }}
                rules={[
                  requiredRule('หักภาษี ณ ที่จ่าย (%)'),
                  {
                    validator(_: unknown, value: string): Promise<void> {
                      if (value && String(value) !== '0' && String(value) !== '1') {
                        return Promise.reject(new Error('โปรดระบุข้อมูล หักภาษี ณ ที่จ่าย 0 หรือ 1 (%) เท่านั้น'));
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              />
            )}
          </Col>
          <Col {...formColumn}>
            {mode === 'view' && (
              <div>
                <p id={`${dataTestId}-cardTax-vat-totalVat-title`} className='text-label-info'>
                  รวมภาษี
                </p>
                <p id={`${dataTestId}-cardTax-vat-totalVat-value`} className='text-display'>
                  {formatCurrency(data.taxAmountAfterCalTax)}
                </p>
              </div>
            )}
            {mode === 'input' && (
              <BaseItemInputNumber
                label='รวมภาษี'
                className='w-full'
                hideFieldControl
                itemName={'taxAmountAfterCalTax'}
                id={`${dataTestId}-cardTax-taxAmountAfterCalTax-input`}
                disabled
              />
            )}
          </Col>
          <Col {...formColumn}>
            {mode === 'view' && (
              <div>
                <p id={`${dataTestId}-cardTax-vat-totalAmount-title`} className='text-label-info'>
                  รวมเป็นเงิน
                </p>
                <p id={`${dataTestId}-cardTax-vat-totalAmount-value`} className='text-display'>
                  {formatCurrency(data.taxTotalAmountAfterCalTax)}
                </p>
              </div>
            )}
            {mode === 'input' && (
              <BaseItemInputNumber
                label='รวมเป็นเงิน'
                className='w-full'
                hideFieldControl
                itemName={'taxTotalAmountAfterCalTax'}
                id={`${dataTestId}-cardTax-taxTotalAmountAfterCalTax-input`}
                disabled
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardDetailTax;
