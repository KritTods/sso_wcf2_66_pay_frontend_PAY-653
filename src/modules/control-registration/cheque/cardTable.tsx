'use client';
import { URL } from '@/constants/configPage';
import { statusPaymentCodeTypeType } from '@/constants/statusSystem';
import {
  controlRegistrationChequeSelector,
  setFilter,
  getControlRegistrationChequeService,
} from '@/store-redux/slices/control-registration/cheque';
import { useAppDispatch } from '@/store-redux/store';
import { PaymentCodeType } from '@/types/payType';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Page } from 'wcf-component-lib/node_modules/iconoir-react';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { BaseButton } from 'wcf-component-lib/src/components';
import { UploadOutlined } from '@ant-design/icons';
import { SpinLoading } from '@/components/common';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, tableList, loading, totalElements } = useSelector(controlRegistrationChequeSelector);
  const { pageSize, pageNumber, orders } = filter.pagination;

  useEffect(() => {
    if (loading) {
      console.log('filter', filter);
      void dispatch(getControlRegistrationChequeService({ data: filter }));
    }
  }, [dispatch, filter, loading]);

  const dataSource = useMemo(() => {
    return tableList;
  }, [tableList]);

  const columns = [
    {
      title: 'ลำดับ',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      widht: 50,
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่เช็ค',
      key: 'chequeNo',
      dataIndex: 'chequeNo',
      align: 'center',
      widht: 150,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'วันที่เช็ค',
      key: 'chequeStampDate',
      dataIndex: 'chequeStampDate',
      align: 'center',
      sorter: true,
      widht: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatDayThai(text)}</span>;
      },
    },

    {
      title: 'จ่ายให้',
      key: 'receiverName',
      dataIndex: 'receiverName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'สถานะ',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      widht: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      widht: 100,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },

    {
      title: 'ช่องทางชำระเงิน',
      key: 'paymentType',
      dataIndex: 'paymentType',
      align: 'center',
      widht: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{statusPaymentCodeTypeType[text as PaymentCodeType]}</span>;
      },
    },
    {
      title: 'รายละเอียด',
      key: 'detail',
      dataIndex: 'detail',
      align: 'center',
      widht: 100,
      render: (text: string, record: { payType: string; paymentNo: string }): React.ReactElement => {
        const row = record;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <Page
                className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                onClick={() => {
                  router.push(`${URL.controlRegistration.controlRegistrationChequeDetail.url}?id=${row.paymentNo}`);
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

  const headTableContent = (): React.ReactElement => {
    if (dataSource.length === 0) return <></>;

    return (
      <BaseButton
        size='middle'
        className='!min-w-[240px]'
        icon={<UploadOutlined />}
        label='รายงานทะเบียนคุมเช็ค'
        onClick={() => {
          void printControlRegistrationReport();
        }}
      />
    );
  };

  const printControlRegistrationReport = (): void => {
    console.log('Print');
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
        <TableListLayout
          headTableContent={headTableContent()}
          key={`${dataTestId}-cardTable`}
          textHeader='ผลลัพธ์การค้นหา'
          type='form'
          totalItems={dataSource.length}
          firstLoading={dataSource.length === 0}
          emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
          emptyDescription='ไม่มีข้อมูลที่ต้องการแสดงในขณะนี้'
          Grid={
            <BaseGrid
              rowKey='paymentNo'
              loading={loading}
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
