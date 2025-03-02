'use client';
import React, { useMemo, useEffect } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { SpinLoading } from '@/components/common';
import { DollarCircle } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  setFilter,
  cutOffOfficeFundPaymentSelector,
  getOfficeFundService,
} from '@/store-redux/slices/cutOffPayment/officefund-payment';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { OtherPaymentDataType } from '@/store-redux/slices/cancel-payment/other-payment';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, tableList, loading, totalElements } = useSelector(cutOffOfficeFundPaymentSelector);
  const { pageSize, pageNumber, orders } = filter.pagination;

  useEffect(() => {
    if (loading) {
      void dispatch(getOfficeFundService({ data: filter }));
    }
  }, [dispatch, loading, filter]);

  const dataSource = useMemo(() => {
    return tableList;
  }, [tableList]);

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
      title: 'เลขที่เอกสาร',
      key: 'documentNo',
      dataIndex: 'documentNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'จ่ายตามประกาศฉบับที่',
      key: 'noticeName',
      dataIndex: 'noticeName',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'วันที่เตรียมจ่าย',
      key: 'transactionDate',
      dataIndex: 'transactionDate',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      width: 100,
      sorter: true,
      align: 'center',
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'จัดการ',
      key: 'id',
      dataIndex: 'id',
      render: (text: string, record: unknown): React.ReactElement => {
        const row = record as OtherPaymentDataType;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <DollarCircle
                id={`${dataTestId}-table-row-${row.documentNo}`}
                className='cursor-pointer bg-[#E6E6F2] text-[#6666B3] rounded-full w-10 h-10 p-2'
                onClick={() => {
                  router.push(`${URL.cutOffPayment.cutOffOfficeFundPaymentForm.url}?id=${row.documentNo}`);
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
      <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
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
