'use client';
import React, { useState } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseForm } from 'wcf-component-lib/src/components';

export default function CardTable(): React.ReactElement {
  const columns = [
    {
      title: 'เลขใบสำคัญรับเงิน / ชนิดเล่ม',
      key: 'value_1',
      dataIndex: 'value_1',
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'value_2',
      dataIndex: 'value_2',
    },
    {
      title: 'จำนวนเงิน',
      key: 'value_3',
      dataIndex: 'value_3',
    },
  ];

  //Exe
  const [dataSource] = useState([
    // ตัวอย่างข้อมูล
    {
      key: '1',
      value_1: '101099006480012',
      value_2: '101099006480012',
      value_3: '150,000.00',
    },
  ]);

  return (
    <BaseForm>
      <div className='flex flex-col items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <TableListLayout
            textHeader='รายการการจ่าย'
            type='form'
            // firstLoading={true}
            firstLoading={dataSource.length === 0}
            Grid={
              <BaseGrid
                // rowKey='invoiceDocumentCode'
                rows={dataSource}
                columns={columns as ColumnsTypeCustom}
                footer={() => (
                  <div className='flex flex-row justify-end '>
                    <div className='text-lg font-bold'>รวม</div>
                    <div className='w-40 px-6 text-lg font-bold text-right'>150,000.00</div>
                  </div>
                )}
                // footer={
                //   <div className='flex flex-row justify-end'>
                //     <div>รวม</div>
                //     <div className='w-64 px-6 text-right'>150,000.00</div>
                //   </div>
                // }
              />
            }
          />
        </div>
      </div>
    </BaseForm>
  );
}
