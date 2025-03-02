'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { formatCurrency } from '@/utils/formatGeneral';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import {
  PageDetailType,
  setPageDetail,
  cancelCutOffPayHospitalSelector,
  HospitalPaymentDataType,
  getHospitalDetailService,
} from '@/store-redux/slices/cancel-cut-off-payment/hospital-payment';
import CardPreparePay from '@/components/common/cardPreparePay';
import CardCash from '@/components/common/cardCash';
import { useSelector } from 'react-redux';

import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import CardCheque from '@/components/common/cardCheque';
import { ReceiveType } from '@/types/payType';
import CardDetailTax from '@/components/common/cardDetailTax';
import CardAddress from '@/components/common/cardAddress';
import { PayloadAction } from '@reduxjs/toolkit';

export default function PaymentHospitalDetail(): React.ReactElement {
  const dataTestId = 'pageCancelCutoffPaymentHospitalDetail';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelCutOffPayHospitalSelector);
  const payType = pageDetail.cardPreparePay?.payType;

  const pageDetailRef = useRef(pageDetail);

  useEffect(() => {
    if (!id) return;

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getHospitalDetailService(id))) as PayloadAction<PageDetailType>;

      if (payload) {
        let dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: payload.cardConsider?.status || '',
          // significantNo: payload.cardConsider?.significantNo || '',
          // significantHandNo: payload.cardConsider?.significantHandNo || '',
          receiveType: payload.cardConsider?.receiveType || 'O',
          receiveName: payload.cardConsider?.receiveName || '',
          identityDocument: payload.cardConsider?.identityDocument || '',
          identityNo: payload.cardConsider?.identityNo || '',
          address: payload.cardConsider?.address || '',
        };

        if (dataCardConsider.receiveType === 'A') {
          //remove object key referenceDocument, referenceNo
          dataCardConsider = {
            ...dataCardConsider,
            referenceDocument: payload.cardConsider?.referenceDocument || '',
            referenceNo: payload.cardConsider?.referenceNo || '',
          };
        }

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
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ผู้มีสิทธิ์',
      key: 'hospitalName',
      dataIndex: 'hospitalName',
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
      title: 'ผู้ประสบอันตราย',
      key: 'receiverName',
      dataIndex: 'receiverName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    ...(payType == 'T'
      ? [
          {
            title: 'ธนาคาร',
            key: 'bank',
            dataIndex: 'bank',
            align: 'center',
            width: 300,
            render: (_: unknown, record: HospitalPaymentDataType): React.ReactElement => {
              return (
                <span className='w-full flex justify-center'>
                  {record.bank.code} {record.bank.name}
                </span>
              );
            },
          },
          {
            title: 'เลขที่บัญชี',
            key: 'bankAccountNo',
            dataIndex: 'bankAccountNo',
            align: 'center',
            width: 300,
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
          {
            title: 'ชื่อบัญชี',
            key: 'bankAccountName',
            dataIndex: 'bankAccountName',
            align: 'center',
            width: 300,
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
        ]
      : []),

    {
      title: 'จำนวนเงิน',
      key: 'totalAmount',
      dataIndex: 'totalAmount',
      align: 'center',
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
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
      title: 'เลขที่ใบสำคัญรับเงิน/ชนิดเล่ม',
      key: 'significantCombined',
      dataIndex: ['significantNo', 'significantHandNo'], // ใช้ array เพื่อเข้าถึงทั้งสองค่า
      align: 'center',
      width: 250,
      render: (_: unknown, record: HospitalPaymentDataType): React.ReactElement => {
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

  const dataCardConsideration = useMemo(() => {
    let data: CardConsiderType = {
      payDate: pageDetail.cardConsider?.payDate || '', // ให้เป็นค่าว่างถ้า undefined
      payer: pageDetail.cardConsider?.payer || '', // ให้เป็นค่าว่างถ้า undefined
      status: pageDetail.cardConsider?.status || '', // ให้เป็นค่าว่างถ้า undefined
      receiveType: (pageDetail.cardConsider?.receiveType as ReceiveType) || undefined, // ให้เป็นค่าว่างถ้า undefined
      receiveName: pageDetail.cardConsider?.receiveName || '', // ให้เป็นค่าว่างถ้า undefined
      identityDocument: pageDetail.cardConsider?.identityDocument || '', // ให้เป็นค่าว่างถ้า undefined
      identityNo: pageDetail.cardConsider?.identityNo || '', // ให้เป็นค่าว่างถ้า undefined
      address: pageDetail.cardConsider?.address || '', // ให้เป็นค่าว่างถ้า undefined
    };

    if (pageDetail.cardConsider?.receiveType === 'A') {
      data = {
        ...data,
        referenceDocument: pageDetail.cardConsider?.referenceDocument || '',
        referenceNo: pageDetail.cardConsider?.referenceNo || '',
      };
    }

    return data;
  }, [pageDetail]);

  const dataCardPreparePay = useMemo(() => {
    if (!pageDetail.cardPreparePay?.payType) return;

    return {
      documentNo: pageDetail.cardPreparePay?.documentNo || '',
      paymentAgent: pageDetail.cardPreparePay?.paymentAgent || '',
      transactionDate: pageDetail.cardPreparePay?.transactionDate || '',
      payType: pageDetail.cardPreparePay?.payType,
    };
  }, [pageDetail.cardPreparePay]);

  const dataTableList = useMemo(() => {
    return pageDetail.paymentList;
  }, [pageDetail.paymentList]);

  const dataTaxDetail = useMemo(
    () => ({
      taxHotpitalName: pageDetail.hospitalName || '',
      taxAmount: pageDetail.amount || 0,
      taxPercent: pageDetail.vat || 0,
      taxAmountAfterCalTax: pageDetail.totalVat || 0,
      taxTotalAmountAfterCalTax: pageDetail.totalAmount || 0,
    }),
    [pageDetail],
  );

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <>
      <div className='flex flex-col gap-4 mx-4 mb-6'>
        {dataCardConsideration && <CardConsider dataTestId={dataTestId} data={dataCardConsideration} />}
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
                rowKey='paymentNo'
                columns={columns as ColumnsTypeCustom}
                rows={dataTableList}
                bordered
                summary={() => {
                  const sumAmount = dataTableList.reduce((prev, curr) => prev + curr.totalAmount, 0);

                  return (
                    <Table.Summary.Row className='bg-gray-200'>
                      <>
                        <Table.Summary.Cell index={0} colSpan={payType == 'T' ? 10 : 7} className='rounded-bl-xl'>
                          <p className='text-lg font-bold text-right mx-4'>รวม</p>
                        </Table.Summary.Cell>

                        <Table.Summary.Cell index={1} colSpan={1}>
                          <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} colSpan={payType == 'T' ? 2 : 1} className='rounded-br-xl'>
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

        {payType == 'S' && pageDetail.postAddress && (
          <CardAddress dataTestId={dataTestId} address={pageDetail.postAddress} mode={'view'} />
        )}

        {pageDetail.isCheque && (
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='bg-white rounded-xl -m-6'>
              <CardCheque isNotShadow dataTestId={dataTestId} dataSource={pageDetail.chequeInfoList} />
            </div>
          </div>
        )}

        {!pageDetail.isCheque && <CardCash dataTestId={dataTestId} cash={pageDetail.cashAmount} />}
        <CardDetailTax dataTestId={dataTestId} data={dataTaxDetail} mode='view' />
        <div className='flex justify-center gap-4'>
          <BaseButton
            id={`${dataTestId}-cancel-button`}
            size='large'
            type='cancel'
            label='ยกเลิก'
            className='w-[240px]'
            onClick={() => router.push(URL.cancelCutOffPayment.cancelCutOffHospitalPayment.url)}
          />
        </div>
      </div>
    </>
  );
}
