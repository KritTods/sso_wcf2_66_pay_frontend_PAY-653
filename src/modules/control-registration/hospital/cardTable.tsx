'use client';
import { SpinLoading } from '@/components/common';
import { URL } from '@/constants/configPage';
import {
  controlRegistrationHospitalSelector,
  getControlRegistrationHospitalService,
  HospitalDataType,
  ResultFilterType,
  setFilter,
} from '@/store-redux/slices/control-registration/hospital';
import { useAppDispatch } from '@/store-redux/store';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Page } from 'wcf-component-lib/node_modules/iconoir-react';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, tableList, loading, totalElements } = useSelector(controlRegistrationHospitalSelector);
  const { pageSize, pageNumber, orders } = filter.pagination;

  useEffect(() => {
    if (loading) {
      void dispatch(getControlRegistrationHospitalService({ data: filter }));
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
      width: 50,
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'ชื่อโรงพยาบาล',
      key: 'hospitalName',
      dataIndex: ['hospitalName', 'hospitalCode'],
      align: 'center',
      width: 150,
      render: (_: unknown, record: HospitalDataType): React.ReactElement => {
        return (
          <span className='w-full flex justify-center'>
            {record.hospitalCode} : {record.hospitalName}
          </span>
        );
      },
    },
    {
      title: 'เลขที่ผู้เสียภาษี',
      key: 'identityNo',
      dataIndex: 'identityNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },

    {
      title: 'เลขที่ใบสำคัญรับเงิน/ชนิดเล่ม',
      key: 'significantCombined',
      dataIndex: ['significantNo', 'significantHandNo'],
      align: 'center',
      width: 100,
      render: (_: unknown, record: HospitalDataType): React.ReactElement => {
        const combinedText = [record.significantNo, record.significantHandNo]
          .filter(Boolean) // ลบค่าที่เป็น '', null, undefined
          .join(' / '); // ใช้ '/' เป็นตัวคั่น

        return (
          <span className='w-full flex justify-center'>
            {combinedText || '-'} {/* ถ้าไม่มีค่าให้แสดง "-" */}
          </span>
        );
      },
    },
    {
      title: 'วันที่ตัดจ่าย',
      key: 'payDate',
      dataIndex: 'payDate',
      align: 'center',
      width: 100,
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
      width: 100,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-start'>{formatCurrency(text)}</span>;
      },
    },

    {
      title: 'ภาษี ณ ที่จ่าย',
      key: 'taxAmount',
      dataIndex: 'vat',
      align: 'center',
      width: 100,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-start'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'จำนวนเงินสุทธิ',
      key: 'netAmount',
      dataIndex: 'totalAmount',
      align: 'center',
      width: 100,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-start'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'สถานะ',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'รายละเอียด',
      key: 'detail',
      dataIndex: 'detail',
      align: 'center',
      width: 100,
      render: (text: string, record: ResultFilterType): React.ReactElement => {
        const row = record;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <Page
                className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                onClick={() => {
                  router.push(`${URL.controlRegistration.controlRegistrationHospitalDetail.url}?id=${row.documentNo}`);
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
