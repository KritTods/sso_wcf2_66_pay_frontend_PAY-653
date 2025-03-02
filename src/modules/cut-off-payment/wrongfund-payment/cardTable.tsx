'use client';
import React, { useEffect, useMemo } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { DollarCircle } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  getWrongFundService,
  cutOffPaymentWrongFundSelector,
  setFilter,
} from '@/store-redux/slices/cutOffPayment/wrongfund-payment';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { statusPayType } from '@/constants/statusSystem';
import { PayType } from '@/types/payType';
import { SpinLoading } from '@/components/common';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, resultFilter, loading, totalElements } = useSelector(cutOffPaymentWrongFundSelector);
  const { pageSize, pageNumber, orders } = filter.pagination;
  useEffect(() => {
    if (loading) {
      void dispatch(getWrongFundService({ data: filter }));
    }
  }, [dispatch, filter, loading]);

  const dataSource = useMemo(() => {
    return resultFilter;
  }, [resultFilter]);

  const columns = [
    {
      title: 'ลำดับ',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่เอกสาร',
      key: 'documentNo',
      dataIndex: 'documentNo',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },

    {
      title: 'สาเหตุการจ่ายผิด',
      key: 'incorrectPaymentReason',
      dataIndex: 'incorrectPaymentReason',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },

    {
      title: 'วันที่เตรียมจ่าย',
      key: 'transactionDate',
      dataIndex: 'transactionDate',
      align: 'center',
      sorter: true,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      sorter: true,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'วิธีการชำระเงิน',
      key: 'payType',
      dataIndex: 'payType',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{statusPayType[text as PayType]}</span>;
      },
    },
    {
      title: 'ตัดจ่าย',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      render: (text: string, record: { payType: string; documentNo: string }, index: number): React.ReactElement => {
        const row = record;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <DollarCircle
                id={`${dataTestId}-table-row-${index}-icon`}
                className='cursor-pointer bg-[#E6E6F2] text-[#6666B3] rounded-full w-10 h-10 p-2'
                onClick={() => {
                  if (row.payType === 'X') {
                    router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundOffice.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'T') {
                    router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundBank.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'S') {
                    router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundCheque.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'P') {
                    router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundMoney.url}?id=${row.documentNo}`);
                  } else {
                    console.log('No action for this payment type');
                  }
                }}
              />
            </div>
          </>
        );
      },
    },
  ];

  //สำหรับ Loading Table รอข้อมูล
  if (loading) {
    return (
      <div className='h-[480px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full bg-white p-6 shadow-sm rounded-lg relative'>
        <TableListLayout
          key={`${dataTestId}-cardTable`}
          textHeader='ผลลัพธ์การค้นหา'
          type='form'
          totalItems={dataSource.length}
          firstLoading={dataSource.length === 0}
          emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
          emptyDescription='ไม่มีข้อมูลที่ต้องการแสดงในขณะนี้'
          Grid={
            <BaseGrid
              rowKey='documentNo'
              rows={dataSource}
              columns={columns as ColumnsTypeCustom}
              page={{
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalData: totalElements,
                orders: orders,
              }}
              orderActive={filter.pagination.orders}
              setOrder={(orders) => {
                console.log('orders', orders);
                dispatch(setFilter({ ...filter, pagination: { ...filter.pagination, orders } }));
              }}
              setPagination={({ pageNumber, pageSize, totalData }) => {
                dispatch(
                  setFilter({
                    ...filter,
                    pagination: { ...filter.pagination, pageNumber, pageSize, totalData },
                  }),
                );
              }}
              isHaveBorderBottomLeftRight
            />
          }
        />
      </div>
    </div>
  );
}
