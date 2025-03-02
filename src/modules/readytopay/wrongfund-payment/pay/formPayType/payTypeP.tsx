'use client';

import React, { useState } from 'react';
import { BaseTabs, BaseIcon, BaseItemInputNumber } from 'wcf-component-lib/src/components';
import { TableCheque, TableMoney } from '@/components/common';
import { Cash } from 'wcf-component-lib/node_modules/iconoir-react';
import { Col, Row, TabsProps, Form, FormInstance } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { PayType } from '@/types/payType';

interface PayTypeXPropsType {
  dataTestId: string;
  payType: PayType;
  form: FormInstance;
}

export const FormPayTypeP = ({ dataTestId, form }: PayTypeXPropsType): React.ReactElement => {
  const [activeTab, setActiveTab] = useState('cheque');
  const items: TabsProps['items'] = [
    {
      key: 'cheque',
      label: (
        <div className='flex justify-center items-center h-[64px]'>
          <BaseIcon
            name='payOrders'
            size='24px'
            className='!mr-1'
            classNameColor={{
              base: '!text-primary',
              active: 'white-text',
              disabled: 'text-primary-very-bright',
            }}
            disabled={false}
            active={activeTab === 'cheque'}
          />
          <span>เช็ค</span>
        </div>
      ),
    },
    {
      key: 'cash',
      label: (
        <div className='flex justify-center items-center h-[64px]'>
          <Cash className='mr-2' />
          <span>เงินสด</span>
        </div>
      ),
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <BaseTabs
        noBackground={true}
        className='w-full'
        defaultActiveKey={'cheque'}
        items={items}
        onChange={(key: string) => setActiveTab(key)}
      />

      {activeTab === 'cheque' && form && (
        <div className=' bg-white rounded-b-xl -mt-4'>
          <Form.List name='cheques'>
            {(_, { add, remove }) => {
              return (
                <>
                  <TableCheque
                    itemName='cheques'
                    form={form}
                    add={add}
                    remove={remove}
                    mode='addWrongFund'
                    dataTestId={dataTestId}
                    hideButtonAdd
                  />
                </>
              );
            }}
          </Form.List>
        </div>
      )}

      {activeTab === 'cash' && (
        <div className=' bg-white rounded-b-xl -mt-4'>
          <div className='p-6'>
            <p className='header-card'>สั่งจ่ายโดย : เงินสด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <BaseItemInputNumber
                  label='จำนวนเงิน (บาท)'
                  id={`${dataTestId}-cash-button`}
                  className='w-full'
                  rules={[requiredRule('จำนวนเงิน (บาท)')]}
                  itemName='cash'
                  hideFieldControl
                />
              </Col>
            </Row>
          </div>
        </div>
      )}

      {form && (
        <div className='bg-white rounded-xl '>
          <Form.List name='moneys'>
            {(_, { add, remove }) => {
              return (
                <>
                  <TableMoney
                    dataTestId={dataTestId}
                    form={form}
                    add={add}
                    remove={remove}
                    itemName='moneys'
                    mode={'addWrongFund'}
                    hideButtonAdd
                    // customDisplayTable={{ ...CUSTOM_DISPLAY_TABLE_MONEY, postalNo: 'input' }}
                    // isNotShadow
                  />
                </>
              );
            }}
          </Form.List>
        </div>
      )}
    </div>
  );
};

export default FormPayTypeP;
