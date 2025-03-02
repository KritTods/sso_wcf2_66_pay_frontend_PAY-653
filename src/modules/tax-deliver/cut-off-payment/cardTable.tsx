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
  getTaxDeliverService,
  cutOffPaymentTaxDeliverSelector,
} from '@/store-redux/slices/tax-deliver/cut-off-payment';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { statusPayType } from '@/constants/statusSystem';
import { PayType } from '@/types/payType';
import { SpinLoading } from '@/components/common';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, resultFilter, loading } = useSelector(cutOffPaymentTaxDeliverSelector);

  useEffect(() => {
    if (loading) {
      void dispatch(getTaxDeliverService({ data: filter }));
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
      width: 50,
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่เตรียมนำส่งภาษี',
      key: 'identityNo',
      dataIndex: 'identityNo',
      align: 'center',
      width: 150,
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
      sorter: true,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
      },
    },
    {
      title: 'จำนวนเงินนำส่งภาษี',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 100,
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
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{statusPayType[text as PayType]}</span>;
      },
    },

    {
      title: 'ตัดจ่าย',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      width: 100,
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
                    router.push(`${URL.taxDeliver.taxDeliverCutOffPaymentOffice.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'T') {
                    router.push(`${URL.taxDeliver.taxDeliverCutOffPaymentBank.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'S') {
                    router.push(`${URL.taxDeliver.taxDeliverCutOffPaymentCheque.url}?id=${row.documentNo}`);
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
      <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
        <TableListLayout
          textHeader='ผลลัพธ์การค้นหา'
          type='form'
          totalItems={dataSource.length}
          firstLoading={dataSource.length === 0}
          emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
          emptyDescription='ไม่มีข้อมูลที่ต้องการแสดงในขณะนี้'
          Grid={
            <BaseGrid
              rowKey='documentNo, id'
              rows={dataSource}
              columns={columns as ColumnsTypeCustom}
              page={{
                pageNumber: 0,
                pageSize: 10,
                totalData: 11,
              }}
              isHaveBorderBottomLeftRight={true}
            />
          }
        />
      </div>
    </div>
  );
}
