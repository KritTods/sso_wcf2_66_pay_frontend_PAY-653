'use client';
import React, { useState, useEffect, useMemo } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { Page, Trash } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { statusPayType } from '@/constants/statusSystem';
import { PayType } from '@/types/payType';
import PopUpConfirmDelete from '@/components/common/popUps/popUpConfirmDelete';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  cancelCutOffPayRefundToEmployerSelector,
  RefundToEmploerDataType,
  getRefundToEmployerService,
  setFilter,
  cancelDoctorSalaryService,
} from '@/store-redux/slices/cancel-cut-off-payment/refund-to-employer';
import { BaseToastNotification } from 'wcf-component-lib/src/components';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filter, tableList, loading, totalElements } = useSelector(cancelCutOffPayRefundToEmployerSelector);
  const { pageSize, pageNumber, orders } = filter.pagination;
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) {
      void dispatch(getRefundToEmployerService({ data: filter }));
    }
  }, [dispatch, filter, loading]);

  const dataSource = useMemo(() => {
    return tableList;
  }, [tableList]);

  // ฟังก์ชันเปิด Modal และบันทึก ID ที่ต้องการลบ
  const handleDelete = (id: string): void => {
    setSelectedId(id);
    setIsOpenConfirmDeleteModal(true);
  };

  const handleConfirmDelete = (): void => {
    if (selectedId) {
      //API Delect
      console.log('Delete', selectedId);
      dispatch(cancelDoctorSalaryService(selectedId))
        .unwrap()

        .then((response) => {
          console.log('API response', response);
          BaseToastNotification({
            type: 'success',
            message: 'เสร็จสิ้น',
            description: 'ทำรายการเสร็จสิ้น',
          });
          // router.push(`${URL.readytopay.paymentOfficeDetail.url}?id=${response.prepareToPayId}`);
        })
        .catch((error) => {
          console.error('API error', error);
        });
    }
    setIsOpenConfirmDeleteModal(false);
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
      title: 'เลขที่ใบสำคัญรับเงิน/ชนิดเล่ม',
      key: 'significantCombined',
      dataIndex: ['significantNo', 'significantHandNo'], // ใช้ array เพื่อเข้าถึงทั้งสองค่า
      align: 'center',
      width: 150,
      render: (_: unknown, record: RefundToEmploerDataType): React.ReactElement => {
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
      title: 'เลขที่เอกสาร',
      key: 'documentNo',
      dataIndex: 'documentNo',
      align: 'center',
      width: 150,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขที่บัญชีนายจ้าง',
      key: 'accountNo',
      dataIndex: 'accountNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'สาขา',
      key: 'accountBranchCode',
      dataIndex: 'accountBranchCode',
      align: 'center',
      width: 100,
      sorter: true,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ชื่อสถานประกอบการ',
      key: 'accountName',
      dataIndex: 'accountName',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
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
      key: 'totalAmount',
      dataIndex: 'totalAmount',
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
      render: (payType: { code: string; name: string } | undefined): React.ReactElement => {
        return <span className='w-full flex justify-start'>{statusPayType[payType?.code as PayType]}</span>;
      },
    },

    {
      title: 'จัดการ',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      width: 100,
      render: (text: string, record: { payType: string; documentNo: string }, index: number): React.ReactElement => {
        const row = record;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <Page
                id={`${dataTestId}-table-row-${index}-icon`}
                className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                onClick={() => {
                  router.push(`${URL.cancelCutOffPayment.cancelCutOffRefundToEmployerDetail.url}?id=${row.documentNo}`);
                }}
              />

              <button
                id={`${dataTestId}-selected-data-btn-delete`}
                className='flex justify-center items-center rounded-full bg-[#F9EAEA] text-[#C42828] w-10 h-10 cursor-pointer'
                onClick={() => handleDelete(row.documentNo)}
              >
                <Trash className='text-xs' />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full bg-white p-6 shadow-sm rounded-lg relative'>
        <TableListLayout
          key={`${dataTestId}-cardTable`}
          textHeader='ผลลัพธ์การค้นหา'
          type='form'
          totalItems={dataSource.length}
          emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
          emptyDescription='ไม่มีข้อมูลที่ต้องการแสดงในขณะนี้'
          Grid={
            <BaseGrid
              loading={loading}
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
    </div>
  );
}
