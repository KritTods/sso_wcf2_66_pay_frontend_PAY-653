'use client';
import React from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { GetPaymentDetailsServiceType } from '@/store-redux/slices/tax-deliver/readytopay';
import SpinLoading from '@/components/common/SpinLoading';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';

interface CardTablePayProps {
  dataTestId: string;
  data: GetPaymentDetailsServiceType | undefined;
}

export default function CardTablePay({ dataTestId, data }: CardTablePayProps): React.ReactElement {
  //สำหรับ Loading Table รอข้อมูล
  if (data === undefined) {
    return (
      <div className='h-[250px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  const { paymentInvoice } = data;

  const columns = [
    {
      title: 'รายการเงินทดแทน',
      key: 'treatMentDescription',
      dataIndex: 'treatMentDescription',
      align: 'center',
      width: 200,
      render: (treatMentDescription: string): React.ReactElement => {
        return <div className='flex justify-start'>{treatMentDescription}</div>;
      },
    },
    {
      title: 'วันที่ - เริ่มต้น',
      key: 'startDate',
      dataIndex: 'startDate',
      width: 100,
      align: 'center',
      render: (startDate: string): React.ReactElement => {
        return <div className='flex justify-center'>{formatDayThai(startDate)}</div>;
      },
    },
    {
      title: 'วันที่ - สิ้นสุด',
      key: 'endDate',
      dataIndex: 'endDate',
      width: 100,
      align: 'center',
      render: (endDate: string): React.ReactElement => {
        return <div className='flex justify-center'>{formatDayThai(endDate)}</div>;
      },
    },
    {
      title: 'เดือน',
      key: 'month',
      dataIndex: 'month',
      width: 50,
      align: 'center',
    },
    {
      title: 'วัน',
      key: 'day',
      dataIndex: 'day',
      width: 50,
      align: 'center',
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      width: 100,
      align: 'center',
      render: (amount: number): React.ReactElement => {
        return <div className='flex justify-end'>{formatCurrency(amount)}</div>;
      },
    },
  ];

  return (
    <div className='flex flex-col items-center gap-4'>
      <div id={`${dataTestId}-paymentInvoice-table`} className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
        <TableListLayout
          textHeader='รายการใบสั่งจ่าย'
          type='form'
          totalItems={paymentInvoice.length}
          firstLoading={paymentInvoice.length === 0}
          Grid={
            <BaseGrid
              summary={() => {
                const sumAmount = paymentInvoice.reduce((prev, curr) => prev + curr.amount, 0);

                return (
                  <Table.Summary.Row className='bg-gray-200'>
                    <Table.Summary.Cell index={0} colSpan={5} className='rounded-bl-xl'>
                      <p className='text-lg font-bold text-right mx-4'>รวม</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={1} className='rounded-br-xl'>
                      <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
              bordered
              rowKey='treatMentDescription'
              rows={paymentInvoice}
              columns={columns as ColumnsTypeCustom}
            />
          }
        />
      </div>
    </div>
  );
}
