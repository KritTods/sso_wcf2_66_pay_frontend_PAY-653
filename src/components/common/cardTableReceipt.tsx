'use client';
import React from 'react';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';

export interface CardTableReceiptProps {
  dataTestId: string;
  data: ReceiptType[];
}

export interface ReceiptType {
  id: string;
  receiptNo: string; //เลขที่ใบเสร็จ
  receiptDate: string; // วันที่ออกใบเสร็จ
  amount: number; // จำนวนเงิน
  accountName: string; //ชื่อสถานประกอบการ
}

export default function CardTableReceipt({ dataTestId, data }: CardTableReceiptProps): React.JSX.Element {
  const columns = [
    {
      title: 'ลำดับ',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      width: 50,
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่ใบเสร็จรับเงิน',
      key: 'receiptNo',
      dataIndex: 'receiptNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'วันที่ออกใบเสร็จ',
      key: 'receiptDate',
      dataIndex: 'receiptDate',
      align: 'left',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-left'>{formatDayThai(text)}</span>;
      },
    },
    {
      title: 'ชื่อสถานประกอบการ',
      key: 'accountName',
      dataIndex: 'accountName',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 100,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
  ];

  return (
    <div className='flex flex-col items-center'>
      <div id={`${dataTestId}-cardTable-Receipt`} className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
        <TableListLayout
          totalItems={data.length}
          textHeader='รายการใบเสร็จรับเงิน'
          type='form'
          Grid={
            <BaseGrid
              rowKey='id'
              rows={data}
              columns={columns as ColumnsTypeCustom}
              bordered
              summary={() => {
                const sumAmount = data.reduce((sum, item) => sum + item.amount, 0);

                return (
                  <Table.Summary.Row className='bg-gray-200'>
                    <Table.Summary.Cell index={0} colSpan={4} className='rounded-bl-xl'>
                      <p className='text-lg font-bold text-right mx-4'>รวม</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={1} className='rounded-br-xl'>
                      <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          }
        />
      </div>
    </div>
  );
}
