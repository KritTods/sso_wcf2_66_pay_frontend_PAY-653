'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import CardDetailPage from '@/modules/readytopay/doctor-salary/component/cardDetailPage';

export default function PaymentMoneyDetail(): React.ReactElement {
  const dataTestId = 'page-moneys-payment-detail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <CardDetailPage dataTestId={dataTestId} paramsId={id || ''} />;
}
