'use client';
import React from 'react';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { TaxDeliverDataType } from '@/store-redux/slices/cancel-payment/tax-deliver';
import { BaseForm } from 'wcf-component-lib/src/components';
import { formatCurrency } from '@/utils/formatGeneral';
import { SpinLoading } from '@/components/common';

export interface CardTablePaymentListType {
  dataTestId: string;
  dataSource: TaxDeliverDataType[];
  isNotShadow?: boolean;
}

export default function TablePaymentList({
  dataTestId,
  dataSource,
  isNotShadow = false,
}: CardTablePaymentListType): React.JSX.Element {
  const columns = [
    {
      title: 'ลำดับ',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      width: 80,
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },

    {
      title: 'เลขที่หนังสือรับรอง',
      key: 'documentNo',
      dataIndex: 'documentNo',
      align: 'center',
      width: 160,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'โรงพยาบาล',
      key: 'hospitalName',
      dataIndex: 'hospitalName',
      align: 'center',
      width: 500,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'เลขประจำตัวผู้เสียภาษี',
      key: 'identityNo',
      dataIndex: 'identityNo',
      align: 'center',
      width: 200,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ค่ารักษา',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 180,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'ภาษีหัก ณ ที่จ่าย',
      key: 'taxAmount',
      dataIndex: 'taxAmount',
      align: 'center',
      width: 180,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
  ];

  if (!dataSource) {
    return (
      <div className={`h-[280px] bg-white ${!isNotShadow && 'shadow-sm'} rounded-xl flex justify-center items-center`}>
        <SpinLoading />
      </div>
    );
  }

  return (
    <div>
      <BaseForm>
        <div className='flex flex-col justify-center items-center'>
          <div
            id={`${dataTestId}-cardTable-PaymentList`}
            className={`w-full bg-white p-6 ${!isNotShadow && 'shadow-sm'} rounded-xl relative`}
          >
            <TableListLayout
              textHeader='รายการสั่งจ่าย'
              type='form'
              totalItems={dataSource.length}
              firstLoading={dataSource.length === 0}
              emptyText='ไม่พบข้อมูลรายการสั่งจ่าย'
              Grid={
                <BaseGrid
                  rowKey='documentNo, id'
                  rows={dataSource}
                  columns={columns as ColumnsTypeCustom}
                  bordered
                  summary={() => {
                    const sumAmount = dataSource.reduce((prev, curr) => prev + curr.amount, 0);
                    const sumTaxAmount = dataSource.reduce((prev, curr) => prev + (curr.taxAmount ?? 0), 0);

                    return (
                      <Table.Summary.Row className='bg-gray-200'>
                        <Table.Summary.Cell index={0} colSpan={4} className='rounded-bl-xl'>
                          <p className='text-lg font-bold text-right mx-4'>รวม</p>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={1}>
                          <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={1} className='rounded-br-xl'>
                          <p className='text-lg font-bold text-right'>{formatCurrency(sumTaxAmount)}</p>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    );
                  }}
                />
              }
            />
          </div>
        </div>
      </BaseForm>
    </div>
  );
}
