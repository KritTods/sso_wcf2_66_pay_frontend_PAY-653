'use client';
import React from 'react';
import CardFilterTab from '@/modules/cut-off-payment/officefund-payment/cardFilterTab';
import CardTable from '@/modules/cut-off-payment/officefund-payment/cardTable';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCutOffPaymentOfficeFundPayment';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
