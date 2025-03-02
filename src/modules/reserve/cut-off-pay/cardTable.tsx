'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Form } from 'wcf-component-lib/node_modules/antd';
import { SendDollars } from 'wcf-component-lib/node_modules/iconoir-react';
import { PlusOutlined } from '@ant-design/icons';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseForm, BaseButton, BaseItemTextArea, BaseDialog, BaseIcon } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { requiredRule, maxRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  cutOffPaySelector,
  setFilter,
  PrepareBudgetSearchType,
  deletePrepareBudget,
  getPrepareBudgetList,
} from '@/store-redux/slices/reserve/cut-off-pay';
import { getUserLoginFullName } from '@/utils/token';
import { formatDateToCustom } from 'wcf-component-lib/src/utils';
import { format } from 'wcf-component-lib/src/constants/dayjsFormat';
import { formatCurrency } from '@/utils/formatGeneral';
import { statusReserve } from '@/constants/statusSystem';
import StatusIndicator from 'wcf-component-lib/src/components/v2/BaseGrid/CustomGridCell/Cell/StatusIndicator';
import { SpinLoading } from '@/components/common';

export default function CardTable(): React.ReactElement {
  const [form] = Form.useForm();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [id, setId] = useState('');
  const fullName = getUserLoginFullName();
  const router = useRouter();
  const dataTestId = 'page-cutoffpay-table';
  const { list, loadData, filter, loading, totalElements } = useSelector(cutOffPaySelector);
  const { pageSize, pageNumber, orders } = filter.pagination;
  const dispatch = useAppDispatch();

  function goToCutoffForm(prepareBudgetRequestId: string): void {
    //เปิดไปหน้าเพิ่มข้อมูล โดยส่ง id ไปด้วย
    router.push(`${URL.reserve.cutOffPayForm.url}?id=${prepareBudgetRequestId}`);
  }

  function preSubmit(prepareBudgetRequestId: string): void {
    setId(prepareBudgetRequestId);
    setIsOpenConfirmModal(true);
  }

  const handleFormSubmit = (values: {
    remark: string;
    prepareBudgetRequestId: string;
    isDeleted: string;
    cancelBy: string | undefined;
  }): void => {
    values.prepareBudgetRequestId = id;
    values.cancelBy = fullName;
    values.isDeleted = 'Y';
    void dispatch(
      deletePrepareBudget({
        data: {
          ...values,
        },
      }),
    );

    //โหลดข้อมูลใหม่ โดยการ set ค่า filter
    void dispatch(setFilter(filter));

    //open confirm modal
    setIsOpenConfirmModal(false);
  };

  const handleCancel = (): void => {
    setIsOpenConfirmModal(false);
  };

  const columns = [
    {
      title: 'เลขที่เอกสาร',
      key: 'documentNo',
      dataIndex: 'documentNo',
    },
    {
      title: 'ประเภทเบิกเงินรองจ่าย',
      key: 'advancePaymentType',
      dataIndex: 'advancePaymentType',
    },
    {
      title: 'วันที่เตรียมจ่าย',
      dataIndex: 'payDate',
      key: 'payDate',
      sorter: true,
      render: (text: string): string => {
        return formatDateToCustom(text, format.buddhist.date);
      },
    },
    {
      title: 'จำนวนเงิน',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      // align: 'right',
      className: 'text-right',
      render: (text: number): string => {
        return formatCurrency(text);
      },
    },

    {
      title: 'สถานะ',
      key: 'payStatus',
      dataIndex: 'payStatus',
      className: 'text-left',
      align: 'center',
      render: (text: string, record: unknown): React.ReactElement => {
        const status = (record as PrepareBudgetSearchType).isDeleted === 'Y' ? 'IS_DELETE_' + text : text;

        return (
          <StatusIndicator
            status='Y'
            customStatusTag={{
              bgColor: statusReserve[status].backgoundColor,
              dotColor: statusReserve[status].color,
              textColor: statusReserve[status].color,
              statusText: statusReserve[status].text,
            }}
          />
        );
      },
    },
    {
      title: 'ผู้เตรียมจ่าย',
      key: 'paymentAgent',
      dataIndex: 'paymentAgent',
    },
    {
      title: 'หมายเหตุ',
      key: 'remark',
      dataIndex: 'remark',
    },
    {
      title: 'จัดการ',
      key: 'manage',
      dataIndex: 'manage',
      render: (text: string, record: unknown): React.ReactElement => {
        const { isDeleted, prepareBudgetRequestId, advancePaymentType, payStatus } = record as PrepareBudgetSearchType;

        // ตรวจสอบว่าใช้งานได้หรือไม่
        const isActionable = (): boolean => {
          if (isDeleted === 'Y') return false; //กรณี ยกเลิกทุกประเภท
          if (advancePaymentType === 'B') return false; //กรณี ประเภทเบิกเงินรองจ่าย = ยืมเงินระหว่างวัน
          if (advancePaymentType === 'B' && payStatus === 'A') return true; //กรณี เป็นประเภท ยืมเงินระหว่างวัน และมีการอนุมัติแล้ว
          // if (advancePaymentType === 'W' && payStatus === 'Y') return true; // กรณี เป็นประเภท เบิกเงินรองจ่าย ตัดจ่ายไปแล้ว

          return true;
        };

        const handleClick = (action: () => void): void => {
          if (isActionable()) action();
        };

        const buttonClass = (activeClass: string, disabledClass: string): string =>
          isActionable() // เรียกใช้ isActionable() ให้ถูกต้อง
            ? `cursor-pointer rounded-full w-10 h-10 p-2 ${activeClass}`
            : `cursor-pointer rounded-full w-10 h-10 p-2 ${disabledClass}`;

        return (
          <div className='flex justify-center gap-2'>
            {/* ปุ่ม SendDollars */}
            {payStatus !== 'Y' ? (
              <SendDollars
                className={buttonClass('bg-[#E7F3F5] text-blue-950', 'bg-[#EDEDED] text-[#BABABA]')}
                onClick={() => handleClick(() => goToCutoffForm(prepareBudgetRequestId))}
              />
            ) : (
              <SendDollars className='bg-[#EDEDED] text-[#BABABA] cursor-pointer rounded-full w-10 h-10 p-2' />
            )}

            {/* ปุ่ม Cancel */}
            <div
              className={buttonClass('bg-red-100 text-red-500', 'bg-[#EDEDED] text-[#BABABA]')}
              onClick={() => handleClick(() => preSubmit(prepareBudgetRequestId))}
            >
              <BaseIcon
                name='cancelCheck'
                size='24px'
                classNameColor={
                  isActionable()
                    ? {
                        base: 'text-error',
                        hover: 'text-error-vbright',
                        active: 'text-error',
                        disabled: 'text-disable',
                      }
                    : undefined
                }
                onClick={() => console.log('Icon clicked')}
                disabled={!isActionable()}
                active={isActionable()}
              />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (loadData) {
      void dispatch(
        getPrepareBudgetList({
          data: {
            paymentNo: filter.paymentNo,
            documentNo: filter.documentNo,
            transactionDateGreaterEqual: filter.transactionDateGreaterEqual,
            transactionDateLesserEqual: filter.transactionDateLesserEqual,
            advancePaymentType: filter.advancePaymentType,
            pagination: {
              pageNumber: filter.pagination.pageNumber,
              pageSize: filter.pagination.pageSize,
              orders: filter.pagination.orders,
            },
          },
        }),
      );
    }
  }, [dispatch, loadData, filter]);

  const dataSource = useMemo(() => {
    return list;
  }, [list]);

  //สำหรับ Loading Table รอข้อมูล
  if (loadData) {
    return (
      <div className='h-[480px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  return (
    <BaseForm onFinish={handleFormSubmit} extraForm={form} name='cancel-cutoffpay'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <div className='flex justify-end absolute right-5'>
            <BaseButton
              size='middle'
              className='!min-w-[280px]'
              icon={<PlusOutlined />}
              label='บันทึกข้อมูลเตรียมจ่าย'
              onClick={() => router.push(URL.reserve.prepare.url)}
            />
          </div>

          <TableListLayout
            textHeader='ผลลัพธ์การค้นหา'
            totalItems={totalElements}
            type='form'
            firstLoading={totalElements === 0}
            emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
            Grid={
              <BaseGrid
                loading={loading}
                rowKey={'prepareBudgetRequestId'}
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
                  dispatch(setFilter({ ...filter, pagination: { ...filter.pagination, orders } }));
                }}
                setPagination={({ pageNumber, pageSize, totalData }) => {
                  dispatch(
                    setFilter({ ...filter, pagination: { ...filter.pagination, pageNumber, pageSize, totalData } }),
                  );
                }}
              />
            }
          />
        </div>
      </div>
      <BaseDialog
        width='560px'
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        content={
          <div className='flex flex-col w-full gap-4'>
            <div className='font-semibold text-3xl text-left'>ยกเลิกการตัดจ่ายใช่หรือไม่?</div>
            <div className='text-left status text-[#4B5760]'>กรุณาระบุเหตุผลการยกเลิก และยืนยันการทำรายการ</div>
            <div className='text-left'>
              <BaseItemTextArea
                itemName='remark'
                id={`${dataTestId}-remark-input-textarea`}
                placeholder='ระบุ'
                label='เหตุผล'
                rules={[requiredRule('หมายเหตุ'), maxRule('หมายเหตุ', 100)]}
              />
            </div>
          </div>
        }
        headerLeftIcon={
          <BaseIcon
            name='cancelCheck'
            size='40px'
            classNameColor={{
              base: 'text-primary',
              hover: 'text-primary-bright',
              active: 'text-secondary',
              disabled: 'text-primary-very-bright',
            }}
            disabled={false}
            active={false}
          />
        }
        footer={
          <div className='flex justify-center gap-4'>
            <BaseButton size='large' type='cancel' label='ปิด' onClick={handleCancel} />
            <BaseButton size='large' label='ยืนยัน' onClick={() => form.submit()} />
          </div>
        }
      />
    </BaseForm>
  );
}
