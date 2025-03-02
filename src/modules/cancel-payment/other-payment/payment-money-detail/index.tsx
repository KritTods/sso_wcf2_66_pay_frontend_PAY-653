'use client';
import React, { useEffect, useMemo } from 'react';
import CardDetail from '@/modules/cancel-payment/other-payment/component/cardDetail';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import CardTableThananat from '@/components/common/cardTableThananat';
import {
  cancelOtherPaymentSelector,
  getOtherPaymentDetailService,
} from '@/store-redux/slices/cancel-payment/other-payment';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';

export default function PaymentMoneyDetail(): React.ReactElement {
  const dataTestId = 'pageCancelOtherPamentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelOtherPaymentSelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getOtherPaymentDetailService(id));
  }, [dispatch, id]);

  const dataSource = useMemo(() => {
    return pageDetail.cardHeaderDetail;
  }, [pageDetail]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardDetail dataTestId={dataTestId} {...dataSource} />
      {pageDetail.isCheque && <CardCheque dataSource={pageDetail.cheques} dataTestId={dataTestId} />}
      {!pageDetail.isCheque && <CardCash dataTestId={dataTestId} cash={pageDetail.cash} />}

      <CardTableThananat dataTestId={dataTestId} dataSource={pageDetail.moneys} />
      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelPayment.cancelOtherPayment.url)}
        />
      </div>
    </div>
  );
}
