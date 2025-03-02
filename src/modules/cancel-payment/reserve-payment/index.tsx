'use client';
import React from 'react';
import CardTable from '@/modules/cancel-payment/reserve-payment/cardTable';
import CardFilterTab from '@/modules/cancel-payment/reserve-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelPaymentReservePayment';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
