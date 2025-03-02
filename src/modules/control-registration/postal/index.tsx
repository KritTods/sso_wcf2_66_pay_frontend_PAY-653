'use client';
import React from 'react';

import CardFilterTab from './cardFilterTab';
import CardTable from './cardTable';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageControlRegistrationPostal';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
