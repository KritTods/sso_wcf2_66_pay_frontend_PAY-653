import React from 'react';
import CardSearch from '@/modules/reserve/components/cardSearchSsoBranchCode';
import CardTable from './cardTable';

export default function Index(): React.ReactElement {
  return (
    <div className='flex flex-col gap-4'>
      <CardSearch />
      <CardTable />
    </div>
  );
}
