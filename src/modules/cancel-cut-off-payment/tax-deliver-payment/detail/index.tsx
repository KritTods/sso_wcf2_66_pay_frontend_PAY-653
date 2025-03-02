'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { Table } from 'wcf-component-lib/node_modules/antd';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import {
  PageDetailType,
  setPageDetail,
  cancelCutOffPayTaxDeliverSelector,
  getcancelCutOffPayTaxDeliverDetailService,
  TaxDeliverDataType,
} from '@/store-redux/slices/cancel-cut-off-payment/tax-deliver';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import CardTableBank from '@/components/common/cardTableBank';
import { PayloadAction } from '@reduxjs/toolkit';
import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import CardPreparePay from '@/components/common/cardPreparePay';
import { formatCurrency } from '@/utils/formatGeneral';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/BaseGrid';

export default function PaymentBankDetail(): React.ReactElement {
  const dataTestId = 'pageCancelCutoffPaymentTaxDeliverPaymentDetail';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelCutOffPayTaxDeliverSelector);
  const payType = pageDetail.cardPreparePay?.payType;

  const pageDetailRef = useRef(pageDetail);

  useEffect(() => {
    if (!id) return;

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(
        getcancelCutOffPayTaxDeliverDetailService(id),
      )) as PayloadAction<PageDetailType>;

      if (payload) {
        const dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: payload.cardConsider?.status || '',
        };

        const newPageForm = {
          ...payload,
          cardConsider: {
            ...dataCardConsider,
          },
        };

        if (JSON.stringify(newPageForm) !== JSON.stringify(pageDetailRef.current)) {
          pageDetailRef.current = newPageForm; // อัปเดต ref
          void dispatch(setPageDetail(newPageForm));
        }
      }
    };

    void fetchData();
  }, [dispatch, id]);

  const dataCardPreparePay = useMemo(() => {
    if (!pageDetail.cardPreparePay?.payType) return;

    return {
      documentNo: pageDetail.cardPreparePay?.documentNo || '',
      paymentAgent: pageDetail.cardPreparePay?.paymentAgent || '',
      transactionDate: pageDetail.cardPreparePay?.transactionDate,
      payType: pageDetail.cardPreparePay?.payType || undefined,
    };
  }, [pageDetail.cardPreparePay]);

  const dataTableList = useMemo(() => {
    return pageDetail.tableList;
  }, [pageDetail.tableList]);

  const datachequeInfoList = useMemo(() => {
    return pageDetail.chequeInfoList;
  }, [pageDetail.chequeInfoList]);

  const dataBanks = useMemo(() => {
    return (
      pageDetail.banks?.map((item) => ({
        id: item.id || '',
        bankCode: item.bank.code || '',
        bankAccountNo: item.bankAccountNo || '',
        bankAccountName: item.bankAccountName || '', // เปลี่ยนชื่อ field ให้ตรงกับ MoneyOrderType
        amount: item.totalAmount || 0,
      })) || []
    );
  }, [pageDetail.banks]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  console.log('dataBanks', dataBanks);
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
      title: 'เลขที่หนังสือรับรอง',
      key: 'hospitalNo',
      dataIndex: 'hospitalNo',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'โรงพยาบาล',
      key: 'hospitalName',
      dataIndex: 'hospitalName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขประจำตัวผู้เสียภาษี',
      key: 'identityNo',
      dataIndex: 'identityNo',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ค่ารักษา',
      key: 'amount',
      dataIndex: 'amount',
      align: 'right',
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'ภาษีหัก ณ ที่จ่าย',
      key: 'taxAmount',
      dataIndex: 'taxAmount',
      align: 'right',
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'เลขที่ใบสำคัญรับเงิน/ชนิดเล่ม',
      key: 'significantCombined',
      dataIndex: ['significantNo', 'significantHandNo'], // ใช้ array เพื่อเข้าถึงทั้งสองค่า
      align: 'center',
      width: 250,
      render: (_: unknown, record: TaxDeliverDataType): React.ReactElement => {
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
  ];

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      {pageDetail.cardConsider && <CardConsider dataTestId={dataTestId} data={pageDetail.cardConsider} />}
      {dataCardPreparePay && <CardPreparePay isNotShadow dataTestId={dataTestId} data={dataCardPreparePay} />}

      <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
        <TableListLayout
          key={`${dataTestId}-cardTable`}
          totalItems={dataTableList.length}
          textHeader='รายการสั่งจ่าย'
          type='form'
          firstLoading={dataTableList.length === 0}
          emptyText='ไม่พบข้อมูลรายการสั่งจ่าย'
          Grid={
            <BaseGrid
              rowKey='id'
              columns={columns as ColumnsTypeCustom}
              rows={dataTableList}
              bordered
              summary={() => {
                const sumAmount = dataTableList.reduce((prev, curr) => prev + curr.totalAmount, 0);
                const sumAmountTax = dataTableList.reduce((prev, curr) => prev + curr.taxAmount, 0);

                return (
                  <Table.Summary.Row className='bg-gray-200'>
                    <>
                      <Table.Summary.Cell index={0} colSpan={4} className='rounded-bl-xl'>
                        <p className='text-lg font-bold text-right mx-4'>รวม</p>
                      </Table.Summary.Cell>

                      <Table.Summary.Cell index={1}>
                        <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <p className='text-lg font-bold text-right'>{formatCurrency(sumAmountTax)}</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={1} className='rounded-br-xl'>
                        <></>
                      </Table.Summary.Cell>
                    </>
                  </Table.Summary.Row>
                );
              }}
            />
          }
        />
      </div>

      {payType == 'T' && dataBanks && <CardTableBank dataTestId={dataTestId} data={dataBanks} />}

      {pageDetail.isCheque && <CardCheque dataSource={datachequeInfoList} dataTestId={dataTestId} />}
      {!pageDetail.isCheque && <CardCash dataTestId={dataTestId} cash={pageDetail.cashAmount} />}

      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelCutOffPayment.cancelCutOffTaxDeliverPayment.url)}
        />
      </div>
    </div>
  );
}
