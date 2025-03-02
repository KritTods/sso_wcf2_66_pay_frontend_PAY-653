'use client';
import React, { useState } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseForm } from 'wcf-component-lib/src/components';

export default function CardTablePay(): React.ReactElement {
  const columns = [
    {
      title: '',
      key: 'value_1',
      dataIndex: 'value_1',
    },
    {
      title: 'เลขใบสำคัญรับเงิน',
      key: 'value_2',
      dataIndex: 'value_2',
    },
    {
      title: 'เลขใบสำคัญรับเงิน(มือ)',
      key: 'value_3',
      dataIndex: 'value_3',
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'value_4',
      dataIndex: 'value_4',
    },
    {
      title: 'จำนวนเงิน',
      key: 'value_5',
      dataIndex: 'value_5',
    },
  ];

  //Exe
  const [dataSource] = useState([
    // ตัวอย่างข้อมูล
    {
      key: '1',
      value_1: '1',
      value_2: '101099006480012',
      value_3: '',
      value_4: '10096200579',
      value_5: '3,000.00',
    },
  ]);

  return (
    <BaseForm>
      <div className='flex flex-col items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <TableListLayout
            textHeader='รายการจ่ายเงินทดแทน'
            type='form'
            firstLoading={dataSource.length === 0}
            Grid={
              <BaseGrid
                // rowKey='invoiceDocumentCode'
                rows={dataSource}
                columns={columns as ColumnsTypeCustom}
                footer={() => (
                  <div className='flex flex-row justify-end '>
                    <div className='text-lg font-bold'>รวม</div>
                    <div className='w-40 px-6 text-lg font-bold text-right'>3,000.00</div>
                  </div>
                )}
              />
            }
          />
        </div>
      </div>
    </BaseForm>
  );
}
