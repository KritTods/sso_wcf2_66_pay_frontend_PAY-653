'use client';

import React from 'react';
import { Form, FormInstance } from 'wcf-component-lib/node_modules/antd';
import { PayType } from '@/types/payType';
import { TableCheque, TableBank } from '@/components/common';

interface PayTypeXPropsType {
  dataTestId: string;
  payType: PayType;
  form: FormInstance;
}

export const FormPayTypeT = ({ dataTestId, form }: PayTypeXPropsType): React.ReactElement => {
  return (
    <div className='flex flex-col gap-4'>
      {form && form.getFieldValue('banks') && (
        <div className='bg-white rounded-xl'>
          <Form.List name='banks'>
            {(_, { add, remove }) => {
              return (
                <>
                  <TableBank
                    itemName='banks'
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
      {form && (
        <div className=' bg-white rounded-xl'>
          <Form.List name='cheques'>
            {(_, { add, remove }) => {
              return (
                <>
                  <TableCheque
                    itemName='cheques'
                    form={form}
                    add={add}
                    remove={remove}
                    mode='add'
                    dataTestId={dataTestId}
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

export default FormPayTypeT;
