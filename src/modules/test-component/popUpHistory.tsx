'use client';
import React from 'react';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { BaseGrid, configProviderBaseGrid } from 'wcf-component-lib/src/components/v2';
import { BaseButton, BaseDialog, ColumnsTypeCustom } from 'wcf-component-lib/src/components';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';

export interface PopUpHistoryProp {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCancel: () => void;
  dataTestId: string;
  typeData: 'string' | 'number' | 'date';
  align: 'center' | 'left' | 'right';
  titleTable: string;
  data: DataHistoryType[];
}

export interface DataHistoryType {
  id: string;
  name: string;
  beforeValue: number | string;
  afterValue: number | string;
  updateBy: string;
  updateDate: string;
}

export const PopUpHistory = ({
  isOpen,
  setIsOpen,
  handleCancel,
  dataTestId,
  typeData,
  align,
  titleTable,
  data,
}: PopUpHistoryProp): React.ReactElement => {
  const themeProvider = {
    ...configProviderBaseGrid,
    theme: {
      ...configProviderBaseGrid.theme,
      components: {
        ...configProviderBaseGrid.theme?.components,
        Table: {
          ...configProviderBaseGrid.theme?.components?.Table,
          headerBg: '#E7F3F5',
          headerColor: '#1C4651',
          headerSortHoverBg: '#779097',
          headerSortActiveBg: '#779097',
        },
      },
    },
  };

  const columns = [
    {
      title: 'ลำดับ',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'ชื่อข้อมูล',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'ข้อมูลก่อนการแก้ไข',
      key: 'beforeValue',
      dataIndex: 'beforeValue',
      align: align,
      render: (text: string): React.ReactElement => {
        let justifyContent = 'justify-start';
        if (align === 'center') {
          justifyContent = 'justify-center';
        }
        if (align === 'right') {
          justifyContent = 'justify-end';
        }

        if (typeData === 'number') {
          return <span className='w-full flex justify-end'>{formatCurrency(Number(text))}</span>;
        }
        if (typeData === 'date') {
          return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
        }

        return <span className={`w-full flex ${justifyContent}`}>{text}</span>;
      },
    },

    {
      title: 'ข้อมูลหลังการแก้ไข',
      key: 'afterValue',
      dataIndex: 'afterValue',
      align: align,
      render: (text: string): React.ReactElement => {
        let justifyContent = 'justify-start';
        if (align === 'center') {
          justifyContent = 'justify-center';
        }
        if (align === 'right') {
          justifyContent = 'justify-end';
        }

        if (typeData === 'number') {
          return <span className='w-full flex justify-end'>{formatCurrency(Number(text))}</span>;
        }
        if (typeData === 'date') {
          return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
        }

        return <span className={`w-full flex ${justifyContent}`}>{text}</span>;
      },
    },
    {
      title: 'ผู้แก้ไข',
      key: 'updateBy',
      dataIndex: 'updateBy',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      headerContent={<></>}
      contentCenter={false}
      content={
        <>
          <div id={`${dataTestId}-popUpHistory-Table`} className='w-full flex flex-col gap-4'>
            <div className='w-full'>
              <TableListLayout
                key={`${dataTestId}-popUpHistory-Table`}
                textHeader={titleTable}
                type='form'
                totalItems={data.length}
                firstLoading={data.length === 0}
                emptyText='ไมพบข้อมูลประวัติการแก้ไข'
                Grid={
                  <BaseGrid
                    rowKey='id'
                    isHaveBorderBottomLeftRight
                    twoToneColor
                    themeProvider={themeProvider}
                    columns={columns as ColumnsTypeCustom}
                    rows={data}
                  />
                }
              />
            </div>
          </div>
        </>
      }
      footer={
        <div className='flex justify-center gap-4'>
          <BaseButton
            id={`${dataTestId}-popUpHistory-cancel-button`}
            size='large'
            type='cancel'
            label='ยกเลิก'
            onClick={() => {
              void setIsOpen(false);
              handleCancel();
            }}
          />
        </div>
      }
    />
  );
};
