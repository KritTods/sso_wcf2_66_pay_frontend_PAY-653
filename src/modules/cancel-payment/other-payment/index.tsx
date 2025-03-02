import CardTable from '@/modules/cancel-payment/other-payment/cardTable';
import CardFilterTab from '@/modules/cancel-payment/other-payment/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelOtherPayment';

  return (
    <div className='flex flex-col gap-4 mx-4'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
