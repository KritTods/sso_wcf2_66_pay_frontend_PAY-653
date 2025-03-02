'use client';
import React, { useState, useMemo, useEffect } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseIcon } from 'wcf-component-lib/src/components';
import { SpinLoading } from '@/components/common';
import { Page } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { cancelOfficeFundSelector, getOfficeFundService } from '@/store-redux/slices/cancel-payment/officefund-payment';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import PopUpConfirmDelete from '@/components/common/popUps/popUpConfirmDelete';
import { OtherPaymentDataType } from '@/store-redux/slices/cancel-payment/other-payment';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, tableList, loading } = useSelector(cancelOfficeFundSelector);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false);

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
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
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
      width: 50,
      render: (text: string, record: unknown): React.ReactElement => {
        const row = record as OtherPaymentDataType;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <Page
                className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                onClick={() => {
                  router.push(`${URL.cancelPayment.cancelOfficeFundPaymentDetail.url}?id=${row.documentNo}`);
                }}
              />
              <div className='p-2 bg-[#F9EAEA] rounded-full w-10 h-10'>
                <BaseIcon
                  name='delete'
                  classNameColor={{
                    base: 'text-error',
                    hover: 'text-error',
                    active: 'text-error',
                    disabled: 'text-disable',
                  }}
                  onClick={() => setIsOpenConfirmDeleteModal(true)}
                />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const handleConfirmDelete = (): void => {
    console.log('Delete');
    setIsOpenConfirmDeleteModal(false);
  };

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
              rowKey='id'
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
      <div id={`${dataTestId}-popup-confirm-footer`} className='flex justify-center gap-6 py-6'>
        <PopUpConfirmDelete
          isOpen={isOpenConfirmDeleteModal}
          setIsOpen={setIsOpenConfirmDeleteModal}
          dataTestId={dataTestId}
          handleCancel={() => setIsOpenConfirmDeleteModal(false)}
          handleConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
