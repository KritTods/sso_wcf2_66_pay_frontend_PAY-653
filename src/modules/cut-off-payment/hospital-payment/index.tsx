'use client';
import React from 'react';
import CardTable from '@/modules/cut-off-payment/hospital-payment/cardTable';
import CardFilterTab from '@/modules/cut-off-payment/hospital-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCutoffPaymentHospitalPayment';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
