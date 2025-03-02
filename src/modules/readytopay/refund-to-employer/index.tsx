'use client';
import React from 'react';
import CardFilterTab from '@/modules/readytopay/refund-to-employer/cardFilterTab';
import CardTable from '@/modules/readytopay/refund-to-employer/cardTable';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageRefundToEmployer';

  return (
    <div className='flex flex-col gap-4 mx-4'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
