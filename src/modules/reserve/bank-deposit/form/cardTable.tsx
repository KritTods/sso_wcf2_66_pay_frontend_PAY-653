'use client';
import React, { useState } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseForm } from 'wcf-component-lib/src/components';

export default function CardTable(): React.ReactElement {
  const columns = [
    {
      title: '',
      key: 'value_1',
      dataIndex: 'value_1',
    },
    {
      title: 'เลขที่เช็ค',
      key: 'value_2',
      dataIndex: 'value_2',
    },
    {
      title: 'ธนาคาร',
      key: 'value_3',
      dataIndex: 'value_3',
    },
    {
      title: 'ผู้รับ',
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
      value_2: '9900648',
      value_3: 'นางสาว สุภาภรณ์ กรรณมา',
      value_4: '100,000.00',
    },
  ]);

  return (
    <BaseForm>
      <div className='flex flex-col items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <TableListLayout
            textHeader='ผลลัพธ์การค้นหา'
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
                    <div className='w-40 px-6 text-lg font-bold text-right'>2,700,000.00</div>
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
