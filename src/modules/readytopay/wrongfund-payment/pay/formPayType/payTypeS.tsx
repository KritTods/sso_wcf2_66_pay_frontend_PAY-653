'use client';

import React from 'react';
import { Form, FormInstance } from 'wcf-component-lib/node_modules/antd';
import { PayType } from '@/types/payType';
import { TableCheque, CardAddress } from '@/components/common';

interface PayTypeXPropsType {
  dataTestId: string;
  payType: PayType;
  form: FormInstance;
}

export const FormPayTypeS = ({ dataTestId, form }: PayTypeXPropsType): React.ReactElement => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-white rounded-xl p-6'>
        <CardAddress dataTestId={dataTestId} mode='input' />
      </div>
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

export default FormPayTypeS;
