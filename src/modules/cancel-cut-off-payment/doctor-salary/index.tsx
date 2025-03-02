import CardTable from '@/modules/cancel-cut-off-payment/doctor-salary/cardTable';
import CardFilterTab from '@/modules/cancel-cut-off-payment/doctor-salary/cardFilterTab';

export default function Index(): React.ReactElement {
  const dataTestId = 'pageCancelCutoffPaymentDoctorSalary';

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardFilterTab dataTestId={dataTestId} />
      <CardTable dataTestId={dataTestId} />
    </div>
  );
}
