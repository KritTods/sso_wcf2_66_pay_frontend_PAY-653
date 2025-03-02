'use client';
import React from 'react';
import CardTable from '@/modules/cut-off-payment/wrongfund-payment/cardTable';
import CardFilterSearch from '@/modules/cut-off-payment/wrongfund-payment/cardFilterSearch';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCutOffPaymentWrongFund';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterSearch dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
