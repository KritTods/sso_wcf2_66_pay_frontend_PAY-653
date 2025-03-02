import CardTable from '@/modules/tax-deliver/cut-off-payment/cardTable';
import CardFilterTab from '@/modules/tax-deliver/cut-off-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCutoffTaxDeliver';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
