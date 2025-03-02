'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { Checkbox } from 'wcf-component-lib/node_modules/antd';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/BaseGrid';
import { Refresh, Trash } from 'wcf-component-lib/node_modules/iconoir-react';
import { ReadyToPayDataType, FilterSearchType } from '@/store-redux/slices/tax-deliver/readytopay';
import { formatCurrency } from '@/utils/formatGeneral';
import { PayType } from '@/types/payType';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';

interface Props {
  dataTestId: string;
  tabActive: PayType;
  filterResult: ReadyToPayDataType[];
  filter: FilterSearchType;
  setFilter: (filter: FilterSearchType) => void;
  totalElements: number;
  callBackDataSelected: (data: ReadyToPayDataType[]) => void;
  dataCurrent: ReadyToPayDataType[];
}

export default function ModalTable({
  dataTestId,
  filterResult,
  filter,
  setFilter,
  totalElements,
  callBackDataSelected,
  dataCurrent,
}: Props): React.ReactElement {
  const [dataSelected, setDataSelected] = useState<ReadyToPayDataType[]>([]);
  const [dataSelectedActiveTable, setDataSelectedActiveTable] = useState<ReadyToPayDataType[]>([]);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');

  useEffect(() => {
    setDataSelected(dataCurrent);
  }, [dataCurrent]);

  //callback callBackDataSelected when dataSelected change
  useEffect(() => {
    callBackDataSelected(dataSelected);
  }, [dataSelected, callBackDataSelected]);

  const columns = [
    {
      title: filter.paymentType !== 'X' && (
        <Checkbox
          checked={dataSelected.length > 0 && dataSelected.length === filterResult.length}
          indeterminate={dataSelected.length > 0 && dataSelected.length < filterResult.length}
          onChange={(e) => {
            if (e.target.checked) {
              setDataSelected(filterResult);
            } else {
              // ยกเลิกการเลือกทั้งหมด
              setDataSelected([]);
            }
          }}
        />
      ),
      key: 'checkbox',
      dataIndex: 'paymentId',
      width: 50,
      align: 'center',
      render: (paymentId: number, record: unknown): React.ReactElement => {
        const row = record as ReadyToPayDataType;

        const handleCheckboxChange = (checked: boolean, record: ReadyToPayDataType): void => {
          if (filter.paymentType === 'X' && checked && dataSelected.length === 1) {
            // ถ้า paymentType เป็น 'X' จะให้เลือกได้แค่ 1 รายการ
            setIsOpenWarningModal(true);
            setCodeWarningModal('005');

            return;
          } else {
            if (checked) {
              setDataSelected([...dataSelected, record]);
            } else {
              //remove item from dataSelected by record.value_2
              setDataSelected(dataSelected.filter((item) => String(item.paymentId) !== String(record.paymentId)));
            }
          }
        };

        // find paymentId in dataSelected
        const isChecked = dataSelected.some((item) => String(item.paymentId) === String(row.paymentId));

        return (
          <div className='flex justify-center'>
            <Checkbox
              checked={isChecked}
              value={paymentId}
              onChange={(e) => handleCheckboxChange(e.target.checked, row)} // เมื่อคลิก checkbox
            />
          </div>
        );
      },
    },
      {
        title: 'เลขที่หนังสือรับรอง',
        key: 'paymentNo',
        dataIndex: 'paymentNo',
        align: 'center',
        widht: 150,
      },
      {
        title: 'โรงพยาบาล',
        key: 'hospitalName',
        dataIndex: 'hospitalName',
        align: 'center',
        widht: 150,
      },
      {
        title: 'เลขที่เตรียมนำส่งภาษี',
        key: 'identityNo',
        dataIndex: 'identityNo',
        align: 'center',
        widht: 150,
      },
      {
        title: 'จำนวนเงิน',
        key: 'taxAmount',
        dataIndex: 'taxAmount',
        sorter: true,
        align: 'right',
        width: 250,
        render: (taxAmount: number): React.ReactElement => {
          return <span className='w-full flex justify-end'>{formatCurrency(taxAmount)}</span>;
        },
      },
      {
        title: 'ภาษีหัก ณ ที่จ่าย',
        key: 'amount',
        dataIndex: 'amount',
        align: 'center',
        widht: 100,
        render: (amount: number): React.ReactElement => {
          return <span className='w-full flex justify-end'>{formatCurrency(amount)}</span>;
        },
      },
  ];

  const SelectedItems = (): React.ReactElement => {
    const onRemove = (item: string): void => {
      //remove item from dataSelected by item paymentId
      setDataSelected(dataSelected.filter((data) => String(data.paymentNo) !== String(item)));
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
                {item.paymentId}
              </p>
              <button
                id={`${dataTestId}-selected-data-btn-delete`}
                className='rounded-full p-1 bg-[#F9EAEA] text-[#C42828]'
                onClick={() => onRemove(item.paymentId)}
              >
                <Trash className='text-xs' />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const dataSource = useMemo(() => {
    return filterResult;
  }, [filterResult]);

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
                  <SelectedItems/>
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
                  setFilter({ ...filter, pagination: { ...filter.pagination, pageNumber, pageSize } });
                }}
                isHaveBorderBottomLeftRight
              />
            </div>
          }
        />
      </div>
      <PopUpWarning
        code={codeWarningModal}
        dataTestId={dataTestId}
        isOpen={isOpenWarningModal}
        setIsOpen={setIsOpenWarningModal}
        handleConfirm={() => setIsOpenWarningModal(false)}
      />
    </div>
  );
}
