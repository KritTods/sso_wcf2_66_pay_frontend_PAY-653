'use client';
import React from 'react';

import CardFilterTab from '@/modules/control-registration/med/cardFilterTab';
import CardTable from '@/modules/control-registration/med/cardTable';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageControlRegistrationMed';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
