'use client';
import React, { useEffect, useMemo } from 'react';
import CardDetail from '@/modules/cancel-payment/components/cardDetail';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { formatCurrency } from '@/utils/formatGeneral';
import { PayType } from '@/types/payType';
import {
  cancelHospitalPaymentSelector,
  getHospitalPaymentDetailService,
} from '@/store-redux/slices/cancel-payment/hospital-payment';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import CardDetailTax from '../../components/cardDetailTax';

export default function Detail(): React.JSX.Element {
  const dataTestId = 'pageCancelPaymentHospitalPaymentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelHospitalPaymentSelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getHospitalPaymentDetailService(id));
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
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ผู้มีสิทธิ์',
      key: 'hospitalName',
      dataIndex: 'hospitalName',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'เลขประสบอันตราย',
      key: '-',
      dataIndex: '-',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      width: 100,
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ผู้ประสบอันตราย',
      key: '-',
      dataIndex: '-',
      width: 100,
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      sorter: true,
      align: 'center',
      width: 100,
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

  const dataCardDetailTax = {
    hospitalName: pageDetail.hospitalName,
    amount: pageDetail.amount,
    vat: pageDetail.vat,
    totalVat: pageDetail.totalVat,
    totalAmount: pageDetail.totalAmount,
  };

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardDetail dataTestId={dataTestId} data={dataCardDetail} />

      <div className='flex flex-col items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <TableListLayout
            totalItems={dataSource.length}
            textHeader='รายการสั่งจ่าย'
            type='form'
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
                      <Table.Summary.Cell index={0} colSpan={6} className='rounded-bl-xl'>
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

      {pageDetail.isCheque && <CardCheque dataSource={pageDetail.cheques} dataTestId={dataTestId} />}
      {!pageDetail.isCheque && <CardCash dataTestId={dataTestId} cash={pageDetail.cash} />}
      <CardDetailTax dataTestId={dataTestId} data={dataCardDetailTax} />
      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelPayment.cancelHospitalPayment.url)}
        />
      </div>
    </div>
  );
}
