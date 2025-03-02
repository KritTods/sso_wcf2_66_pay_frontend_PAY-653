'use client';
import React from 'react';
import CardTable from '@/modules/tax-deliver/readytopay/cardTable';
import CardFilterTab from '@/modules/tax-deliver/readytopay/cardFilterTab';

export default function index(): React.ReactElement {
  const dataTestId = 'PageReadyToPay';

  return (
    <div className='flex flex-col gap-4 mx-4'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
