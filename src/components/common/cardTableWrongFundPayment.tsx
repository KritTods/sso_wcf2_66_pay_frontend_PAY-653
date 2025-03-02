'use client';
import React from 'react';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { IncorrectPaymentReasonType, PayType } from '@/types/payType';
import { statusIncorrectPaymentReason } from '@/constants/statusSystem';

export interface CardTableWrongFundPaymentProps {
  dataTestId: string;
  data: WrongFundPaymentType[];
  isNotShadow?: boolean;
}

export interface WrongFundPaymentType {
  significantNo?: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo?: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  documentNo: string; //เลขที่เอกสาร
  paymentNo?: string; // เลขที่ใบสั่งจ่าย
  causesOfIncorrectPayment?: IncorrectPaymentReasonType; // สาเหตุการจ่ายเงินผิด
  paymentRequest?: string; // จ่ายคืนให้
  date: string; // วันที่ออกใบเสร็จ
  amount: number; // จำนวนเงิน
  payType?: {
    //ประเภทการจ่ายเงิน
    code: PayType | undefined;
    name: string;
  };
}

//รายการสั่งจ่าย จ่ายผิดกองทุนเงินทดแทน commom
export default function CardTablePayment({
  dataTestId,
  data,
  isNotShadow = false,
}: CardTableWrongFundPaymentProps): React.JSX.Element {
  const hasSignificantData = data.some((item) => item.significantNo || item.significantHandNo);

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
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'สาเหตุการจ่ายผิด',
      key: 'causesOfIncorrectPayment',
      dataIndex: 'causesOfIncorrectPayment',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{statusIncorrectPaymentReason[text]}</span>;
      },
    },
    {
      title: 'จ่ายให้',
      key: 'paymentRequest',
      dataIndex: 'paymentRequest',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 100,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'วันที่',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
      },
    },
    ...(hasSignificantData
      ? [
          {
            title: 'เลขที่ใบสำคัญรับเงิน/ชนิดเล่ม',
            key: 'significantCombined',
            dataIndex: ['significantNo', 'significantHandNo'], // ใช้ array เพื่อเข้าถึงทั้งสองค่า
            align: 'center',
            width: 150,
            render: (_: unknown, record: WrongFundPaymentType): React.ReactElement => {
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
        ]
      : []),
  ];

  return (
    <div className={`w-full bg-white p-6 ${!isNotShadow && 'shadow-sm'} rounded-xl`}>
      <div id={`${dataTestId}-cardTable-WrongFund-Payment`}>
        <TableListLayout
          totalItems={data.length}
          textHeader='รายการสั่งจ่าย'
          type='form'
          Grid={
            <BaseGrid
              rowKey='id'
              rows={data}
              columns={columns as ColumnsTypeCustom}
              bordered
              summary={() => {
                const sumAmount = data.reduce((sum, item) => sum + item.amount, 0);

                return (
                  <Table.Summary.Row className='bg-gray-200'>
                    <Table.Summary.Cell index={0} colSpan={4} className='rounded-bl-xl'>
                      <p className='text-lg font-bold text-right mx-4'>รวม</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={1}>
                      <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={2}
                      colSpan={hasSignificantData ? 3 : 1}
                      className='rounded-br-xl'
                    ></Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          }
        />
      </div>
    </div>
  );
}
