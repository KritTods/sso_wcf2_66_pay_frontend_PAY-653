import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { formatCurrency } from '@/utils/formatGeneral';
import { BaseItemInputNumber } from 'wcf-component-lib/src/components';
import { requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

interface CardCashProp {
  dataTestId: string;
  cash: number;
  mode?: 'view' | 'input';
  itemName?: string;
}

export default function cardCash({
  dataTestId,
  cash,
  mode = 'view',
  itemName = 'cash',
}: CardCashProp): React.JSX.Element {
  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className='font-bold text-xl'>สั่งจ่ายโดย : เงินสด</p>
        {mode === 'view' && (
          <Row gutter={[16, 16]}>
            <Col {...formColumn}>
              <p id={`${dataTestId}-cash-label-title`} className='text-label-info'>
                จำนวนเงิน (บาท)
              </p>
            </Col>
            <Col {...formColumn}>
              <p id={`${dataTestId}-cash-label-value`} className='text-display'>
                {cash !== 0 ? formatCurrency(cash) : 0}
              </p>
            </Col>
          </Row>
        )}

        {mode === 'input' && (
          <Row gutter={[16, 16]}>
            <Col {...formColumn}>
              <BaseItemInputNumber
                label='จำนวนเงิน (บาท)'
                id={`${dataTestId}-cash-input-number`}
                className='w-full'
                rules={[requiredRule('จำนวนเงิน (บาท)')]}
                itemName={itemName}
                hideFieldControl
              />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}
