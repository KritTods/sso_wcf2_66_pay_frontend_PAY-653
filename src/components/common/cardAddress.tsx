import React from 'react';
import { BaseItemTextArea } from 'wcf-component-lib/src/components';
import { Col } from 'wcf-component-lib/node_modules/antd';
import { singleColumn } from '@/constants/layoutColumn';
import { maxRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

interface CardAddressProp {
  dataTestId: string;
  address?: string;
  isNotShadow?: boolean;
  mode?: 'view' | 'input';
  itemName?: string;
}

export default function CardAddress({
  dataTestId,
  address,
  isNotShadow = false,
  mode = 'view',
  itemName = 'address',
}: CardAddressProp): React.JSX.Element {
  return (
    <div className='flex flex-col items-center'>
      <div className={`w-full bg-white ${!isNotShadow && 'shadow-sm'} relative rounded-xl`}>
        {mode === 'view' && (
          <Col {...singleColumn}>
            <p className='header-card pb-5'>ส่งเช็คทางไปรษณีย์</p>
            <div>
              <p id={`${dataTestId}-cardAddress-address-label-title`} className='text-label-info'>
                ที่อยู่
              </p>
              <p id={`${dataTestId}-cardAddress-address-label-value`} className='text-display'>
                {address}
              </p>
            </div>
          </Col>
        )}

        {mode === 'input' && (
          <Col {...singleColumn}>
            <p className='header-card pb-5'>ส่งเช็คทางไปรษณีย์</p>
            <div>
              <BaseItemTextArea
                id={`${dataTestId}-cardAddress-address-input-textarea`}
                itemName={itemName}
                label='ที่อยู่'
                rules={[requiredRule('ที่อยู่'), maxRule('ที่อยู่', 400)]}
              />
            </div>
          </Col>
        )}
      </div>
    </div>
  );
}
