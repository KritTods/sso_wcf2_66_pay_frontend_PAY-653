'use client';
import CardTable from '@/modules/cancel-payment/wrongfund-payment/cardTable';
import CardFilterTab from '@/modules/cancel-payment/wrongfund-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelWrongFund';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
