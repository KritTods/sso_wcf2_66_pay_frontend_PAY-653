'use client';
import React, { useEffect, useMemo } from 'react';
import CardDetail from '@/modules/cancel-payment/components/cardDetail';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import { PayType } from '@/types/payType';
import { cancelTaxDeliverSelector, getTaxDeliverDetailService } from '@/store-redux/slices/cancel-payment/tax-deliver';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import CardDetailTax from '@/modules/cancel-payment/components/cardDetailTax';
import CardTableBank from '@/components/common/cardTableBank';
import TablePaymentList from '@/modules/cancel-payment/tax-deliver/component/tablePaymenList';

export default function PaymentBankDetail(): React.ReactElement {
  const dataTestId = 'pageCancelTaxDeliverDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelTaxDeliverSelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getTaxDeliverDetailService(id));
  }, [dispatch, id]);

  const dataSource = useMemo(() => {
    return pageDetail.tableList;
  }, [pageDetail]);

  const dataBanks = useMemo(() => {
    console.log(pageDetail.banks);

    return pageDetail.banks;
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

      <TablePaymentList dataTestId={dataTestId} dataSource={dataSource} />

      <CardTableBank dataTestId={dataTestId} data={dataBanks} />

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
          onClick={() => router.push(URL.cancelPayment.cancelTaxDeliver.url)}
        />
      </div>
    </div>
  );
}
