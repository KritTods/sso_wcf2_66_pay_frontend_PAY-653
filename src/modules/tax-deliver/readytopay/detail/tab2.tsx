'use client';
import React, { useState, useMemo } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { formatDayThai } from '@/utils/formatGeneral';
import { GetHistoryByCidServiceType } from '@/store-redux/slices/tax-deliver/readytopay';
import SpinLoading from '@/components/common/SpinLoading';
interface Tab2Props {
  dataTestId: string;
  data: GetHistoryByCidServiceType[] | undefined;
}

export default function Tab2({ dataTestId, data }: Tab2Props): React.ReactElement {
  const [sorting, setSorting] = useState<{ direction: string | undefined; property: string }[]>();

  const dataSource = useMemo(() => {
    if (!data) return [];

    const newData = [...data];
    //sort data state
    if (sorting && sorting.length > 0) {
      const key = sorting[0].property as keyof GetHistoryByCidServiceType;
      const direction = sorting[0].direction as string;
      newData.sort((a, b) => {
        if (a[key] !== undefined && b[key] !== undefined && a[key] < b[key]) {
          return -1;
        } else if (a[key] !== undefined && b[key] !== undefined && a[key] > b[key]) {
          return 1;
        }

        return 0;
      });
      if (direction === 'DESC') {
        newData.reverse();
      }
    }

    return newData;
  }, [data, sorting]);

  const columns = [
    {
      title: 'ลำดับ',
      key: 'no',
      dataIndex: 'no',
      align: 'center',
      width: 50,
      render: (chequeNo: number, record: unknown, index: number): React.ReactElement => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentCode',
      dataIndex: 'paymentCode',
      align: 'center',
      width: 150,
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      align: 'center',
      width: 150,
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      align: 'center',
      width: 150,
    },
    {
      title: 'รายการเงินทดแทน',
      key: 'treatmentName',
      dataIndex: 'treatmentName',
      align: 'center',
      width: 150,
      render: (treatmentName: string): React.ReactElement => {
        return <div className='flex justify-start'>{treatmentName}</div>;
      },
    },
    {
      title: 'วันที่จ่าย',
      key: 'payDate',
      dataIndex: 'payDate',
      align: 'center',
      width: 150,
      sorter: true,
      render: (payDate: string): React.ReactElement => {
        return <div className='flex justify-center'>{formatDayThai(payDate)}</div>;
      },
    },
    {
      title: 'จ่ายให้',
      key: 'hospital',
      dataIndex: 'hospital',
      align: 'center',
      width: 200,
      render: (hospital: string): React.ReactElement => {
        return <div className='flex justify-start'>{hospital}</div>;
      },
    },
    {
      title: 'จ่ายโดย',
      key: 'payType',
      dataIndex: 'payType',
      align: 'center',
      width: 200,
      render: (payType: string): React.ReactElement => {
        return <div className='flex justify-start'>{payType}</div>;
      },
    },
  ];

  //สำหรับ Loading Table รอข้อมูล
  if (data === undefined) {
    return (
      <div className='h-[480px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <div id={`${dataTestId}-history-table`} className='w-full bg-white p-6 shadow-sm rounded-b-xl relative'>
        <TableListLayout
          textHeader='ประวัติใบสั่งจ่าย'
          type='form'
          totalItems={dataSource.length}
          firstLoading={dataSource.length === 0}
          Grid={
            <BaseGrid
              orderActive={sorting && sorting.length > 0 ? sorting : undefined}
              setOrder={(orders) => {
                setSorting(orders);
              }}
              isHaveBorderBottomLeftRight
              rows={dataSource}
              columns={columns as ColumnsTypeCustom}
            />
          }
        />
      </div>
    </div>
  );
}
