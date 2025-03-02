import CardTable from '@/modules/cancel-payment/tax-deliver/cardTable';
import CardFilterTab from '@/modules/cancel-payment/tax-deliver/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelTaxDeliver';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
