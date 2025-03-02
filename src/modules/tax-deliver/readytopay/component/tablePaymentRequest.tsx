'use client';
import React, { useMemo, useState } from 'react';
import { Table } from 'wcf-component-lib/node_modules/antd';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { BaseGrid } from 'wcf-component-lib/src/components/v2';
import { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { ReadyToPayDataType } from '@/store-redux/slices/tax-deliver/readytopay';
import { BaseButton } from 'wcf-component-lib/src/components';
import { PlusOutlined } from '@ant-design/icons';
import ModalPaymentOrder from '@/modules/tax-deliver/readytopay/component/modalPaymentOrder';
import { Trash } from 'wcf-component-lib/node_modules/iconoir-react';
import { formatCurrency } from '@/utils/formatGeneral';
import { PayType } from '@/types/payType';

interface TablePaymentRequestProps {
  dataTestId: string;
  tabActive: PayType;
  data: ReadyToPayDataType[];
  setData: (data: ReadyToPayDataType[]) => void;
  mode?: 'view' | 'input';
}

export default function TablePaymentRequest({
  dataTestId,
  tabActive,
  data,
  setData,
  mode = 'view',
}: TablePaymentRequestProps): React.ReactElement {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const dataSource = useMemo(() => {
    return data;
  }, [data]);

  const columns = [
    {
      title: 'ลำดับ',
      align: 'center',
      key: 'no',
      dataIndex: 'no',
      width: 50,
      render: (chequeNo: number, record: unknown, index: number): React.ReactElement => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่หนังสือรับรอง',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      width: 200,
      align: 'center',
    },
    {
      title: 'โรงพยาบาล',
      key: 'hospitalName',
      dataIndex: 'hospitalName',
      width: 500,
      align: 'center',
      render: (hospitalName: string): React.ReactElement => {
        return <div className='flex justify-start'>{hospitalName}</div>;
      },
    },
    {
      title: 'เลขประจำตัวผู้เสียภาษี',
      key: 'identityNo',
      dataIndex: 'identityNo',
      align: 'center',
      widht: 250,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ค่ารักษา',
      key: 'taxAmount',
      dataIndex: 'taxAmount',
      align: 'right',
      width: 200,
      render: (taxAmount: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(taxAmount)}</span>;
      },
    },
    {
      title: 'ภาษีหัก ณ ที่จ่าย',
      key: 'amount',
      dataIndex: 'amount',
      align: 'right',
      width: 200,
      render: (amount: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{amount}</span>;
      },
    },
    
    // {
    //   title: 'เลขประสบอันตราย',
    //   key: 'accidentIssueCode',
    //   dataIndex: 'accidentIssueCode',
    //   width: 50,
    //   align: 'center',
    // },
    ...(mode === 'input'
      ? [
          {
            title: '',
            key: 'paymentId',
            dataIndex: 'paymentId',
            align: 'center',
            width: 50,
            render: (paymentId: number): React.ReactElement => {
              return (
                <div className='flex justify-center items-center'>
                  <div
                    className='w-10 h-10 flex justify-center items-center p-2 rounded-full bg-red-100 cursor-pointer  mb-6'
                    onClick={() => {
                      const newData = [...dataSource].filter((item) => String(item.paymentId) !== String(paymentId));
                      setData(newData);
                    }}
                  >
                    <Trash color='red' />
                  </div>
                </div>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <TableListLayout
            textHeader='รายการสั่งจ่าย'
            type='form'
            totalItems={dataSource.length}
            headTableContent={
              mode === 'input' && (
                <BaseButton
                  size='middle'
                  className='!min-w-[240px]'
                  icon={<PlusOutlined />}
                  label='เพิ่มรายการสั่งจ่าย'
                  onClick={() => setIsOpenCreateModal(true)}
                />
              )
            }
            Grid={
              <BaseGrid
                rowKey='paymentId'
                rows={dataSource}
                columns={columns as ColumnsTypeCustom}
                bordered
                summary={(pageData) => {
                  // คำนวณผลรวมของฟิลด์ amount
                  const totalTaxAmount = pageData.reduce((sum, record) => sum + Number(record.taxAmount), 0);
                  const totalAmount = pageData.reduce((sum, record) => sum + Number(record.amount), 0);

                  return (
                    <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={0}
                        colSpan={tabActive === 'T' ? 4 : 4}
                        className='!bg-gray-200 !rounded-bl-xl'
                      >
                        <p className='px-6 text-right'>รวม</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={0} colSpan={1}
                        className={`!bg-gray-200 ${mode === 'view' ? '' : ''}`}
                      >
                        <p className='text-right'>{formatCurrency(totalTaxAmount)}</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={0} colSpan={1}
                        className={`!bg-gray-200 ${mode === 'view' ? '!rounded-br-xl' : ''}`}
                      >
                        <p className='text-right'>{formatCurrency(totalAmount)}</p>
                      </Table.Summary.Cell>
                      {mode === 'input' && (
                        <Table.Summary.Cell index={2} className='!bg-gray-200 !rounded-br-xl'></Table.Summary.Cell>
                      )}
                    </Table.Summary.Row>
                  );
                }}
              />
            }
          />
        </div>
      </div>
      {isOpenCreateModal && (
        <ModalPaymentOrder
          tabActive={tabActive}
          isOpenModal={isOpenCreateModal}
          setOpenModal={setIsOpenCreateModal}
          dataTestId={dataTestId}
          setData={setData}
          data={data}
        />
      )}
    </>
  );
}
