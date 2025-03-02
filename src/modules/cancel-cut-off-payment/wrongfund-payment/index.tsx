import CardTable from '@/modules/cancel-cut-off-payment/wrongfund-payment/cardTable';
import CardFilterTab from '@/modules/cancel-cut-off-payment/wrongfund-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelCutoffPaymentWrongFund';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
