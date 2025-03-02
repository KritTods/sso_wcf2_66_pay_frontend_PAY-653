'use client';
import React from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/BaseGrid';
import { BaseForm } from 'wcf-component-lib/src/components';
import { formatCurrency } from '@/utils/formatGeneral';
import { SpinLoading } from '@/components/common';

export interface MoneyOrderType {
  // ข้อมูลธนาณัติ
  postalNo: string; //เลขที่ธนาณัติ
  postalCode: string; //รหัสไปรษณีย์ปลายทาง
  portalDestination: string; //ชื่อไปรษณีย์ปลายทาง
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  amount: number; // จำนวนเงิน
}

export interface CardTableThananatType {
  dataTestId: string;
  dataSource: MoneyOrderType[];
  columnsName?: ColumnsNameType;
  isNotShadow?: boolean;
}

export interface ColumnsNameType {
  postalNo: string;
  postalCode: string;
  portalDestination: string;
  receiverName: string;
  amount: string;
}

export const initColumnsName = {
  postalNo: 'เลขที่ธนาณัติ',
  postalCode: 'รหัสไปรษณีย์ปลายทาง',
  portalDestination: 'ชื่อไปรษณีย์ปลายทาง',
  receiverName: 'ลูกจ้าง/ผู้มีสิทธิ์',
  amount: 'จำนวนเงิน',
};

export default function CardTableThananat({
  dataTestId,
  dataSource,
  columnsName = initColumnsName,
  isNotShadow = false,
}: CardTableThananatType): React.ReactElement {
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
      title: columnsName.postalNo,
      key: 'postalNo',
      dataIndex: 'postalNo',
      align: 'center',
      width: 200,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: columnsName.postalCode,
      key: 'postalCode',
      dataIndex: 'postalCode',
      align: 'center',
      width: 200,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: columnsName.portalDestination,
      key: 'portalDestination',
      dataIndex: 'portalDestination',
      align: 'center',
      width: 200,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: columnsName.receiverName,
      key: 'receiverName',
      dataIndex: 'receiverName',
      align: 'center',
      width: 200,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: columnsName.amount,
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 150,
      //sorter: true,
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
            id={`${dataTestId}-cardTable-Thananat`}
            className={`w-full bg-white p-6 ${!isNotShadow && 'shadow-sm'} rounded-xl relative`}
          >
            <TableListLayout
              key={`${dataTestId}-ThananatTable`}
              textHeader='ธนาณัติ'
              type='form'
              totalItems={dataSource.length}
              firstLoading={dataSource.length === 0}
              emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
              Grid={
                <BaseGrid
                  isHaveBorderBottomLeftRight
                  twoToneColor
                  rowKey='id'
                  rows={dataSource}
                  columns={columns as ColumnsTypeCustom}
                />
              }
            />
          </div>
        </div>
      </BaseForm>
    </div>
  );
}
