'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Checkbox } from 'wcf-component-lib/node_modules/antd';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { Refresh, Trash } from 'wcf-component-lib/node_modules/iconoir-react';
import { useSelector } from 'react-redux';
import {
  readyToPayDoctorSalarySelector,
  ReadyToPayDataType,
  FilterSearchType,
} from '@/store-redux/slices/readytopay/doctor-salary';
import { PayType } from '@/types/payType';

interface dataPops {
  dataTestId: string;
  tabActive: PayType;
  dataRows: ReadyToPayDataType[];
  filter: FilterSearchType;
  setFilter: (filter: FilterSearchType) => void;
  totalElements: number;
  callBackDataSelected: (data: ReadyToPayDataType[]) => void;
}

export default function ModalTable({
  tabActive,
  dataRows,
  filter,
  setFilter,
  totalElements,
  callBackDataSelected,
}: dataPops): React.ReactElement {
  const [dataSelected, setDataSelected] = useState<ReadyToPayDataType[]>([]);
  const [dataSelectedActiveTable, setDataSelectedActiveTable] = useState<ReadyToPayDataType[]>([]);
  const {
    pageDoctorSalalyForm: { selectList },
  } = useSelector(readyToPayDoctorSalarySelector);

  //set dataSelected from pageForm.tableList
  useEffect(() => {
    setDataSelected(selectList);
  }, [selectList]);

  //callback callBackDataSelected when dataSelected change
  useEffect(() => {
    callBackDataSelected(dataSelected);
  }, [callBackDataSelected, dataSelected]);

  const dataSource = useMemo(() => {
    return dataRows;
  }, [dataRows]);

  const columns = [
    {
      title: (
        <Checkbox
          checked={dataSelected.length === 10}
          onChange={(e) => {
            if (e.target.checked) {
              setDataSelected(dataSource);
            } else {
              setDataSelected([]);
            }
          }}
        />
      ),
      key: 'checkbox',
      dataIndex: 'paymentNo',
      render: (paymentNo: string, record: unknown): React.ReactElement => {
        const row = record as ReadyToPayDataType;

        const handleCheckboxChange = (checked: boolean, record: ReadyToPayDataType): void => {
          if (checked) {
            setDataSelected([...dataSelected, record]);
          } else {
            //remove item from dataSelected by record.value_2
            setDataSelected(dataSelected.filter((item) => item.paymentNo !== record.paymentNo));
          }
        };

        // find paymentId in dataSelected
        const isChecked = dataSelected.some((item) => item.paymentNo === paymentNo);

        return (
          <div className='flex justify-center'>
            <Checkbox
              checked={isChecked}
              value={paymentNo}
              onChange={(e) => handleCheckboxChange(e.target.checked, row)} // เมื่อคลิก checkbox
            />
          </div>
        );
      },
    },
    {
      title: 'ลำดับ',
      key: 'no',
      dataIndex: 'no',
      align: 'center',
      render: (chequeNo: number, record: unknown, index: number): React.ReactElement => {
        return <span key={`row-${index}`}>{index + 1}</span>;
      },
    },
    tabActive === 'T' && {
      title: 'ธนาคาร',
      key: 'bankCode',
      dataIndex: 'bankCode',
      align: 'center',
    },
    {
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      align: 'center',
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      align: 'center',
    },
    {
      title: 'ลูกจ้าง /ผู้มีสิทธิ์',
      key: 'fullName',
      dataIndex: 'fullName',
      align: 'center',
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'right',
      sorter: true,
      render: (amount: string): React.ReactElement => {
        const amountNumber = Number(amount);

        return <div>{amountNumber.toLocaleString()}</div>;
      },
    },
  ];

  const SelectedItems = (): React.ReactElement => {
    const onRemove = (item: string): void => {
      console.log('item', item);
      //remove item from dataSelected by item paymentId
      setDataSelected(dataSelected.filter((data) => data.paymentId !== item));
    };

    return (
      <div className='flex flex-wrap gap-2'>
        {dataSelected.map((item, index) => (
          <div key={index} className='flex gap-2 flex-row'>
            <div
              className={`flex flex-row items-center select-none ${
                dataSelectedActiveTable.includes(item) ? 'bg-[#1c4651] text-[#E6EFF5]' : 'bg-[#d3e1e4] text-[#1c4651]'
              } gap-2 p-2 px-4 rounded-xl`}
            >
              <p
                className='cursor-pointer'
                onClick={() => {
                  //check if item is in array dataSelectedActiveTable or not then remove item from dataSelectedActiveTable
                  if (dataSelectedActiveTable.includes(item)) {
                    setDataSelectedActiveTable(dataSelectedActiveTable.filter((data) => data !== item));
                  } else {
                    //add item to dataSelectedActiveTable
                    setDataSelectedActiveTable([...dataSelectedActiveTable, item]);
                  }
                }}
              >
                {item.paymentNo}
              </p>
              <button className='rounded-full p-1 bg-[#F9EAEA] text-[#C42828]' onClick={() => onRemove(item.paymentId)}>
                <Trash className='text-xs' />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='w-full'>
        <TableListLayout
          textHeader='ผลลัพธ์การค้นหา'
          type='form'
          firstLoading={dataSource.length === 0}
          totalItems={totalElements}
          emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
          Grid={
            <div>
              <div className='p-3 rounded-xl bg-white border mb-4 -mt-2 flex gap-2'>
                <div className='flex flex-row justify-start items-center gap-2 mr-auto '>
                  <div className='w-[100px]'>รายการที่เลือก</div>
                  <SelectedItems />
                </div>
                <div className='flex w-[120px] justify-end'>
                  <button
                    className='flex flex-row justify-end items-start gap-2 p-2 text-[#C42828]'
                    onClick={() => {
                      setDataSelected([]);
                      setDataSelectedActiveTable([]);
                    }}
                  >
                    <Refresh className='text-sm' /> ล้างทั้งหมด
                  </button>
                </div>
              </div>
              <BaseGrid
                rowKey='paymentId'
                rows={dataSelectedActiveTable.length > 0 ? dataSelectedActiveTable : dataSource}
                columns={columns as ColumnsTypeCustom}
                page={{
                  pageNumber: filter.pagination.pageNumber,
                  pageSize: filter.pagination.pageSize,
                  totalData: totalElements,
                  orders: filter.pagination.orders,
                }}
                orderActive={filter.pagination.orders}
                setOrder={(orders) => {
                  setFilter({ ...filter, pagination: { ...filter.pagination, orders } });
                }}
                setPagination={({ pageNumber, pageSize }) => {
                  setFilter({
                    ...filter,
                    pagination: { ...filter.pagination, pageNumber, pageSize },
                  });
                }}
                isHaveBorderBottomLeftRight
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
