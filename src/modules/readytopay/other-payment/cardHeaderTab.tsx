'use client';
import React from 'react';
import { Col, Row } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { BaseItemInput } from 'wcf-component-lib/src/components';
import { maxRule, minRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
interface BaseTabsProps {
  dataTestId: string;
}

export default function CardHeaderTab({ dataTestId }: BaseTabsProps): React.ReactElement {
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full bg-white shadow-sm rounded-xl flex flex-row gap-4 p-6'>
        <div className='w-full'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>บันทึกจ่ายเงินประเภทอื่น</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <BaseItemInput
                  id={`${dataTestId}-bookNo-input-text`}
                  label='เลขที่หนังสือ รง.'
                  itemName='bookNo'
                  placeholder='ระบุเลขหนังสือ รง.'
                  rules={[minRule('เลขที่หนังสือ รง.', 10), maxRule('เลขที่หนังสือ รง.', 10)]}
                />
              </Col>
              <Col {...formColumn}>
                <BaseItemInput
                  id={`${dataTestId}-receiverName-input-text`}
                  label='ชื่อผู้มีสิทธิ์'
                  itemName='receiverName'
                  placeholder='ระบุชื่อผู้มีสิทธิ์'
                  rules={[requiredRule('ชื่อผู้มีสิทธิ์')]}
                />
              </Col>
              <Col lg={12} xl={12}>
                <BaseItemInput
                  id={`${dataTestId}-paymentType-input-text`}
                  label='ประเภทการจ่ายนอกระบบ'
                  itemName='paymentType'
                  placeholder='ระบุประเภทการจ่ายนอกระบบ'
                  rules={[requiredRule('ประเภทการจ่ายนอกระบบ')]}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
