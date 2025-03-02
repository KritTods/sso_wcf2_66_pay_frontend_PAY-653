'use client';
import React, { useEffect, useMemo, useRef } from 'react';

import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  cancelCutOffPayWrongFundSelector,
  getcancelCutOffPayWrongFundDetailService,
  PageDetailType,
  setPageDetail,
} from '@/store-redux/slices/cancel-cut-off-payment/wrongfund-payment';
import CardPreparePay from '@/components/common/cardPreparePay';
import CardCash from '@/components/common/cardCash';
import { useSelector } from 'react-redux';

import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import CardCheque from '@/components/common/cardCheque';
import { ReceiveType } from '@/types/payType';
import CardTableThananat from '@/components/common/cardTableThananat';
import CardAddress from '@/components/common/cardAddress';
import CardTableBank from '@/components/common/cardTableBank';
import CardTableWrongFundPayment from '@/components/common/cardTableWrongFundPayment';
import CardTableReceipt from '@/components/common/cardTableReceipt';

export default function DoctorSalaryDetail(): React.ReactElement {
  const dataTestId = 'pageCancelCutoffPaymentWrongFundDetail';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelCutOffPayWrongFundSelector);
  const payType = pageDetail.cardPreparePay?.payType;

  const pageDetailRef = useRef(pageDetail);

  useEffect(() => {
    if (!id) return;

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(
        getcancelCutOffPayWrongFundDetailService(id),
      )) as PayloadAction<PageDetailType>;

      if (payload) {
        let dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: payload.cardConsider?.status || '',
          significantNo: payload.cardConsider?.significantNo || undefined,
          significantHandNo: payload.cardConsider?.significantHandNo || undefined,
          receiveType: payload.cardConsider?.receiveType || undefined,
          receiveName: payload.cardConsider?.receiveName || '',
          identityDocument: payload.cardConsider?.identityDocument || '',
          identityNo: payload.cardConsider?.identityNo || '',
          address: payload.cardConsider?.address || '',
        };

        if (dataCardConsider.receiveType === 'A') {
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

  const dataCardConsideration = useMemo(() => {
    let data: CardConsiderType = {
      payDate: pageDetail.cardConsider?.payDate || '', // ให้เป็นค่าว่างถ้า undefined
      payer: pageDetail.cardConsider?.payer || '', // ให้เป็นค่าว่างถ้า undefined
      significantNo: pageDetail.cardConsider?.significantNo || '-', // เลขที่ใบสำคัญรับเงิน
      significantHandNo: pageDetail.cardConsider?.significantHandNo || '-', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
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
      paymentNo: pageDetail.cardPreparePay?.paymentNo || '',
      paymentAgent: pageDetail.cardPreparePay?.paymentAgent || '',
      transactionDate: pageDetail.cardPreparePay?.transactionDate,
      payType: pageDetail.cardPreparePay?.payType || undefined,
      bookNo: pageDetail.cardPreparePay?.bookNo || '',
      receiverName: pageDetail.cardPreparePay?.receiverName || '',
      paymentType: pageDetail.cardPreparePay?.paymentType,
      advancePaymentType: pageDetail.cardPreparePay?.advancePaymentType || undefined,
      incorrectPaymentReason: pageDetail.cardPreparePay?.incorrectPaymentReason || undefined,
      employeeCitizenId: pageDetail.cardPreparePay?.employeeCitizenId || '',
      employeeName: pageDetail.cardPreparePay?.employeeName,
      accountNo: pageDetail.cardPreparePay?.accountNo || '',
      paymentRequest: pageDetail.cardPreparePay?.paymentRequest || '',
      amount: pageDetail.cardPreparePay?.amount || 0,
    };
  }, [pageDetail.cardPreparePay]);

  const dataTableList = useMemo(() => {
    return pageDetail.tableList;
  }, [pageDetail.tableList]);

  const dataRecipts = useMemo(() => {
    return pageDetail.receipts;
  }, [pageDetail.receipts]);

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

  const dataCardThananat = useMemo(() => {
    return (
      pageDetail.postalInfoList?.map((item) => ({
        postalNo: item.postalNo || '',
        postalCode: item.postalCode || '',
        portalDestination: item.portalDestination || '',
        receiverName: item.employeeName || '', // เปลี่ยนชื่อ field ให้ตรงกับ MoneyOrderType
        amount: item.postalAmount || 0,
      })) || []
    );
  }, [pageDetail.postalInfoList]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <>
      <div className='flex flex-col gap-4 mx-4 mb-6'>
        {dataCardConsideration && <CardConsider dataTestId={dataTestId} data={dataCardConsideration} />}
        {dataCardPreparePay && <CardPreparePay isNotShadow dataTestId={dataTestId} data={dataCardPreparePay} />}
        {pageDetail.cardPreparePay?.advancePaymentType === 'FIN' && (
          <>
            <CardTableWrongFundPayment dataTestId={dataTestId} data={dataTableList} />
            <CardTableReceipt dataTestId={dataTestId} data={dataRecipts} />
          </>
        )}
        {payType == 'T' && dataBanks && <CardTableBank dataTestId={dataTestId} data={dataBanks} />}

        {payType == 'S' && pageDetail.postAddress && (
          <CardAddress dataTestId={dataTestId} address={pageDetail.postAddress} mode={'view'} />
        )}

        {pageDetail.isCheque && <CardCheque dataTestId={dataTestId} dataSource={pageDetail.chequeInfoList} />}

        {!pageDetail.isCheque && <CardCash dataTestId={dataTestId} cash={pageDetail.cashAmount} />}

        {payType == 'P' && pageDetail.postalInfoList && (
          <CardTableThananat dataTestId={dataTestId} dataSource={dataCardThananat} />
        )}

        <div className='flex justify-center gap-4'>
          <BaseButton
            id={`${dataTestId}-cancel-button`}
            size='large'
            type='cancel'
            label='ยกเลิก'
            className='w-[240px]'
            onClick={() => router.push(URL.cancelCutOffPayment.cancelCutOffWrongfundPayment.url)}
          />
        </div>
      </div>
    </>
  );
}
