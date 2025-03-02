import CardTable from '@/modules/receipt-manual/tax-deliver/cardTable';
import CardFilterTab from '@/modules/receipt-manual/tax-deliver/cardFilterTab';

export default function index(): React.ReactElement {
  const dataTestId = 'pageReceiptTaxDeliver';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
