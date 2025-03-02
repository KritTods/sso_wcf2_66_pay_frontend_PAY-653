import React from 'react';
import CardSearch from './cardSearch';
import CardTable from './cardTable';

export default function Index(): React.ReactElement {
  return (
    <div>
      <CardSearch />
      <CardTable />
    </div>
  );
}
