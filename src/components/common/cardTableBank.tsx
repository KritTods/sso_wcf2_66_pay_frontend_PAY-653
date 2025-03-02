'use client';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store-redux/store';
import { formatCurrency } from '@/utils/formatGeneral';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import { SpinLoading } from '@/components/common';

export interface CardTableBankProp {
  dataTestId: string;
  data: CardTableBankType[];
  isNotShadow?: boolean;
}

export interface CardTableBankType {
  id: string;
  bankCode: string;
  bankAccountName: string;
  bankAccountNo: string;
  amount: number;
}

export default function CardTableBank({
  dataTestId,
  data,
  isNotShadow = false,
}: CardTableBankProp): React.ReactElement {
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
      title: 'ธนาคาร',
      key: 'bankCode',
      dataIndex: 'bankCode',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{displayBankName(text)}</span>;
      },
    },
    {
      title: 'ชื่อบัญชี',
      key: 'bankAccountName',
      dataIndex: 'bankAccountName',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขที่บัญชี',
      key: 'bankAccountNo',
      dataIndex: 'bankAccountNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
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

  const dataSource = useMemo(() => {
    return data;
  }, [data]);

  if (!dataSource) {
    return (
      <div className={`h-[280px] bg-white ${!isNotShadow && 'shadow-sm'} rounded-xl flex justify-center items-center`}>
        <SpinLoading />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <div
        id={`${dataTestId}-cardBank`}
        className={`w-full bg-white p-6 ${!isNotShadow && 'shadow-sm'}  rounded-xl relative`}
      >
        <TableListLayout
          key={`${dataTestId}-BankTable`}
          totalItems={dataSource.length}
          textHeader='ธนาคาร'
          type='form'
          firstLoading={dataSource.length === 0}
          emptyText='ไม่พบข้อมูลธนาคาร'
          Grid={
            <BaseGrid
              isHaveBorderBottomLeftRight
              rowKey='id'
              rows={dataSource}
              columns={columns as ColumnsTypeCustom}
              twoToneColor
            />
          }
        />
      </div>
    </div>
  );
}
