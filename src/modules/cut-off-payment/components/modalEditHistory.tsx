/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { statusPayType } from '@/constants/statusSystem';
import { PayType } from '@/types/payType';
import { formatDayThai, formatCurrency } from '@/utils/formatGeneral';
import React from 'react';
import { BaseButton, BaseDialog, ColumnsTypeCustom } from 'wcf-component-lib/src/components';
import { BaseGrid, configProviderBaseGrid } from 'wcf-component-lib/src/components/v2';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';

interface Props {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  dataTestId: string;
}

export default function ModalEditHistory({
  isOpenModal,
  setOpenModal,
  dataTestId = 'modal',
}: Props): React.ReactElement {
  //   const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const themeProvider = {
    ...configProviderBaseGrid,
    theme: {
      ...configProviderBaseGrid.theme,
      components: {
        ...configProviderBaseGrid.theme?.components,
        Table: { ...configProviderBaseGrid.theme?.components?.Table, headerBg: '#F3F4F6', headerColor: '#000000' },
      },
    },
  };

  const dataSource = [
    {
      dataName: 'เลขที่เอกสาร',
      dataBefore: '000000000',
      dataAfter: '000000001',
      updateBy: 'นาย สมชาย ใจดี',
      updateDate: '2024-12-31',
    },
  ];

  const columns = [
    {
      title: 'ลำดับ',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      width: 100,
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'ชื่อข้อมูล',
      key: 'dataName',
      dataIndex: 'dataName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ข้อมูลก่อนการแก้ไข',
      key: 'dataBefore',
      dataIndex: 'dataBefore',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },

    {
      title: 'ข้อมูลหลังการแก้ไข',
      key: 'dataAfter',
      dataIndex: 'dataAfter',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ผู้แก้ไข',
      key: 'updateBy',
      dataIndex: 'updateBy',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'วันที่แก้ไข',
      key: 'updateDate',
      dataIndex: 'updateDate',
      align: 'center',
      sorter: true,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
      },
    },
  ];

  return (
    <BaseDialog
      width='1200px'
      isOpen={isOpenModal}
      setIsOpen={setOpenModal}
      contentCenter={false}
      content={
        <div className='w-full flex justify-center gap-4'>
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
      }
      footer={
        <div className='flex justify-center gap-4'>
          <BaseButton size='large' type='cancel' label='ยกเลิก' onClick={() => setOpenModal(false)} />
        </div>
      }
    />
  );
}
