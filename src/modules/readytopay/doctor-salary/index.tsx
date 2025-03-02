'use client';
import React, { useState } from 'react';
import CardTable from '@/modules/readytopay/doctor-salary/cardTable';
import CardFilterTab from '@/modules/readytopay/doctor-salary/cardFilterTab';
import { ReadyToPayDataType } from '@/store-redux/slices/readytopay/doctor-salary';

export default function Index(): React.ReactElement {
  const dataTestId = 'page-doctor-salary-form';
  const [dataSelected, setDataSelected] = useState<ReadyToPayDataType[]>([]);

  return (
    <div className='flex flex-col gap-4 mx-4'>
      <CardFilterTab dataTestId={dataTestId} setDataSelected={setDataSelected} />
      <CardTable dataTestId={dataTestId} dataSelected={dataSelected} setDataSelected={setDataSelected} />
    </div>
  );
}
