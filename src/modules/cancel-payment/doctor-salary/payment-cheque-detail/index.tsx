'use client';
import React, { useEffect, useMemo } from 'react';
import CardDetail from '@/modules/cancel-payment/components/cardDetail';
import CardCheque from '@/components/common/cardCheque';
import CardAddress from '@/components/common/cardAddress';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { PayType } from '@/types/payType';
import {
  cancelDoctorSalarySelector,
  getDoctorSalaryDetailService,
} from '@/store-redux/slices/cancel-payment/doctor-salary';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { formatCurrency } from '@/utils/formatGeneral';
import { URL } from '@/constants/configPage';

export default function PaymentChequeDetail(): React.ReactElement {
  const dataTestId = 'pageCancelPaymentDoctorSalaryDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelDoctorSalarySelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getDoctorSalaryDetailService(id));
  }, [dispatch, id]);

  const columns: ColumnsTypeCustom = [
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
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ลูกจ้าง/ผู้มีสิทธิ์',
      key: 'receiverName',
      dataIndex: 'receiverName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      //sorter: true,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
  ];

  const dataSource = useMemo(() => {
    return pageDetail.tableList;
  }, [pageDetail]);

  const dataCardDetail = {
    documentNo: pageDetail.documentNo,
    username: pageDetail.username,
    transactionDate: pageDetail.transactionDate,
    payType: pageDetail.payType as PayType,
  };

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardDetail dataTestId={dataTestId} data={dataCardDetail} />

      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <TableListLayout
            textHeader='รายการสั่งจ่าย'
            type='form'
            totalItems={dataSource.length}
            firstLoading={dataSource.length === 0}
            emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
            Grid={
              <BaseGrid
                rowKey='id'
                rows={dataSource}
                columns={columns}
                bordered
                summary={() => {
                  const sumAmount = dataSource.reduce((prev, curr) => prev + curr.amount, 0);

                  return (
                    <Table.Summary.Row className='bg-gray-200'>
                      <Table.Summary.Cell index={0} colSpan={5} className='rounded-bl-xl'>
                        <p className='text-lg font-bold text-right mx-4'>รวม</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} colSpan={1} className='rounded-br-xl'>
                        <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
            }
          />
        </div>
      </div>

      <CardAddress dataTestId={dataTestId} address={pageDetail.address} />
      <CardCheque dataSource={pageDetail.cheques} dataTestId={dataTestId} />
      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelPayment.cancelPaymentDoctorSalary.url)}
        />
      </div>
    </div>
  );
}
