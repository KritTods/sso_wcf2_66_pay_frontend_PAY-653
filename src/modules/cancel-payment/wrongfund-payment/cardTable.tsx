'use client';
import React, { useEffect, useMemo, useState } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseIcon } from 'wcf-component-lib/src/components';
import { Page } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  cancelWrongFundSelector,
  getWrongFundService,
  WrongFundDataType,
} from '@/store-redux/slices/cancel-payment/wrongfund-payment';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { statusPayType } from '@/constants/statusSystem';
import { PayType } from '@/types/payType';
import PopUpConfirmDelete from '@/components/common/popUps/popUpConfirmDelete';
import { SpinLoading } from '@/components/common';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, tableList, loading } = useSelector(cancelWrongFundSelector);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false);

  useEffect(() => {
    if (loading) {
      void dispatch(getWrongFundService({ data: filter }));
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
      title: 'เลขที่คำสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
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
      width: 100,
      sorter: true,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
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
      title: 'จัดการ',
      key: 'id',
      dataIndex: 'id',
      width: 50,

      render: (text: string, record: unknown): React.ReactElement => {
        const row = record as WrongFundDataType;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <Page
                className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                onClick={() => {
                  if (row.payType === 'X') {
                    router.push(`${URL.cancelPayment.cancelWrongfundOfficeDetail.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'T') {
                    router.push(`${URL.cancelPayment.cancelWrongfundBankeDetail.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'S') {
                    router.push(`${URL.cancelPayment.cancelWrongfundChequeDetail.url}?id=${row.documentNo}`);
                  } else if (row.payType === 'P') {
                    router.push(`${URL.cancelPayment.cancelWrongfundMoneyDetail.url}?id=${row.documentNo}`);
                  } else {
                    console.log('No action for this payment type');
                  }
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
