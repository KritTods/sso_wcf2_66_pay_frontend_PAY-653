'use client';

import React, { useEffect } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { TableChequeType } from '@/components/common/tableCheque';
import { SpinLoading } from '@/components/common';
import { useSelector } from 'react-redux';
import { getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import { useAppDispatch } from '@/store-redux/store';

export interface CardChequeType {
  dataTestId: string;
  dataSource: TableChequeType[];
  isNotShadow?: boolean;
}

export default function CardCheque({
  dataTestId,
  dataSource,
  isNotShadow = false,
}: CardChequeType): React.ReactElement {
  const dispatch = useAppDispatch();
  // ใช้ useSelector ภายในฟังก์ชัน component
  const { list: bankList } = useSelector(bankSelector);
  useEffect(() => {
    void dispatch(
      getBankList({
        data: {
          pagination: {
            pageNumber: 0,
            pageSize: 10000,
            orders: [
              {
                direction: 'DESC',
                property: 'bankCode',
              },
            ],
          },
        },
      }),
    );
  }, [dispatch]);

  const displayBankName = (bankCode: string): string => {
    const bank = bankList.find((item) => item.bankCode === bankCode);

    return bank ? `${bank.bankCode} : ${bank.bankName}` : '';
  };

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
      title: 'เลขที่เช็ค',
      key: 'chequeNo',
      dataIndex: 'chequeNo',
      align: 'center',
      width: 200,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ธนาคาร',
      key: 'bankCode',
      dataIndex: 'bankCode',
      align: 'center',
      width: 300,
      render: (text: string): React.ReactElement => {
        console.log('text', text);

        return <span className='w-full flex justify-center'>{displayBankName(text)}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 200,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'วันที่เช็ค',
      key: 'chequeStampDate',
      dataIndex: 'chequeStampDate',
      align: 'center',
      width: 200,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
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
    <>
      <div className='flex flex-col justify-center items-center '>
        <div
          id={`${dataTestId}-cardCheque`}
          className={`w-full bg-white p-6  ${!isNotShadow && 'shadow-sm'} rounded-xl`}
        >
          <TableListLayout
            key={`${dataTestId}-ChequeTable`}
            totalItems={dataSource.length}
            textHeader='สั่งจ่ายโดย : เช็ค'
            type='form'
            firstLoading={dataSource.length === 0}
            emptyText='ไม่พบข้อมูลเช็ค'
            Grid={
              <BaseGrid
                isHaveBorderBottomLeftRight
                twoToneColor
                rowKey='id'
                columns={columns as ColumnsTypeCustom}
                rows={dataSource}
              />
            }
          />
        </div>
      </div>
    </>
  );
}
