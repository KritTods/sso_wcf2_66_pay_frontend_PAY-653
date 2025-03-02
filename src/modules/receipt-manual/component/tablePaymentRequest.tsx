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
    ...(tabActive === 'T'
      ? [
          {
            title: 'ธนาคาร',
            align: 'center',
            key: 'bankCode',
            dataIndex: 'bankCode',
            width: 200,
            render: (text: string, record: unknown): React.ReactElement => {
              const row = record as ReadyToPayDataType;

              return (
                <div className='flex justify-start'>
                  {row.bank?.code} : {row.bank?.name}
                </div>
              );
            },
          },
        ]
      : []),
    {
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      width: 150,
      align: 'center',
    },
    {
      title: 'ผู้มีสิทธิ์',
      key: 'hospital',
      dataIndex: 'hospital',
      width: 250,
      align: 'center',
      render: (hospital: string): React.ReactElement => {
        return <div className='flex justify-start'>{hospital}</div>;
      },
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      width: 200,
      align: 'center',
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      width: 200,
      align: 'center',
    },
    {
      title: 'ผู้ประสบอันตราย',
      key: 'fullName',
      dataIndex: 'fullName',
      width: 250,
      align: 'center',
      render: (fullName: string): React.ReactElement => {
        return <div className='flex justify-start'>{fullName}</div>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 250,
      render: (amount: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(Number(amount))}</span>;
      },
    },
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
                      // const newData = [...pageForm.tableList].filter((item) => item.paymentId !== paymentId);
                      // void dispatch(setPageForm({ ...pageForm, tableList: newData }));
                      const newData = [...dataSource].filter((item) => item.paymentId !== paymentId);
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
                  const totalAmount = pageData.reduce((sum, record) => sum + Number(record.amount), 0);

                  return (
                    <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={0}
                        colSpan={tabActive === 'T' ? 7 : 6}
                        className='!bg-gray-200 !rounded-bl-xl'
                      >
                        <p className='px-6 text-right'>รวม</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={1}
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
