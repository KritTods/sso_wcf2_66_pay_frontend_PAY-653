'use client';
import React from 'react';
import { Page } from 'wcf-component-lib/node_modules/iconoir-react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseForm, BaseButton, BaseIcon } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useRouter, usePathname } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { bankDepositSelector } from '@/store-redux/slices/reserve/bankDeposit';

export default function CardTable(): React.ReactElement {
  const router = useRouter();
  const { list: dataTableBankDeposit } = useSelector(bankDepositSelector);
  const pathname = usePathname();
  //แสดงปุ่มสร้างเฉพาะหน้านำฝากธนาคาร
  const displayBtnCreate = pathname === URL.reserve.bankDeposit.url;

  const columns = [
    {
      title: 'วันที่นำฝาก',
      key: 'value_1',
      dataIndex: 'value_1',
    },
    {
      title: 'จำนวนเงิน',
      key: 'value_2',
      dataIndex: 'value_2',
    },
    {
      title: 'ผู้บันทึกข้อมูล',
      key: 'value_3',
      dataIndex: 'value_3',
    },
    {
      title: 'จัดการ',
      key: 'manage',
      dataIndex: 'manage',
      render: (): React.ReactElement => (
        <>
          <div className='flex justify-start gap-2'>
            {displayBtnCreate ? (
              <>
                <Page
                  className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                  onClick={() => router.push(URL.reserve.bankDepositDetail.url)}
                />

                <div
                  className='cursor-pointer bg-[#FFF9E5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                  // onClick={() => router.push(URL.reserve.bankDepositForm.url)}
                >
                  <BaseIcon
                    name='edit'
                    size='24px'
                    classNameColor={{
                      base: 'text-primary',
                      hover: 'text-primary-bright',
                      active: 'text-secondary',
                      disabled: 'text-primary-very-bright',
                    }}
                    disabled={false}
                    active={false}
                  />
                </div>
              </>
            ) : (
              <Page
                className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                onClick={() => router.push(URL.reserve.bankDepositDetail.url)}
              />
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <BaseForm>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <div className='flex justify-end absolute right-5'>
            {displayBtnCreate && (
              <BaseButton
                size='middle'
                className='!min-w-[280px]'
                icon={<PlusOutlined />}
                label='บันทึกข้อมูลนำฝากธนาคาร'
                onClick={() => router.push(URL.reserve.bankDepositForm.url)}
              />
            )}
          </div>
          <TableListLayout
            textHeader='ผลลัพธ์การค้นหา'
            totalItems={dataTableBankDeposit.length}
            type='form'
            firstLoading={dataTableBankDeposit.length === 0}
            Grid={
              <BaseGrid
                // rowKey='invoiceDocumentCode'
                rows={dataTableBankDeposit}
                columns={columns as ColumnsTypeCustom}
              />
            }
          />
        </div>
      </div>
    </BaseForm>
  );
}
