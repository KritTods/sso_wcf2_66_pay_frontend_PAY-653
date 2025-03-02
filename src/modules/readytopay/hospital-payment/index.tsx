'use client';
import React from 'react';
import CardTable from '@/modules/readytopay/hospital-payment/cardTable';
import CardFilterTab from '@/modules/readytopay/hospital-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageHospitalPayment';

  return (
    <div className='flex flex-col gap-4 mx-4'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
