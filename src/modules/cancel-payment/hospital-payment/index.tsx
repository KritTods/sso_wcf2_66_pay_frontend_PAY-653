'use client';
import React from 'react';
import CardTable from '@/modules/cancel-payment/hospital-payment/cardTable';
import CardFilterTab from '@/modules/cancel-payment/hospital-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelPaymentHospitalPayment';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
