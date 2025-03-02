import CardTable from '@/modules/cancel-cut-off-payment/tax-deliver-payment/cardTable';
import CardFilterTab from '@/modules/cancel-cut-off-payment/tax-deliver-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelCutoffPaymentTaxDeliverPayment';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
