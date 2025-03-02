'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import CardDetailPage from '@/modules/readytopay/doctor-salary/component/cardDetailPage';

export default function PromptPayDetail(): React.ReactElement {
  const dataTestId = 'page-promptpay-payment-detail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <CardDetailPage dataTestId={dataTestId} paramsId={id || ''} />;
}
