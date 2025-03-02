import cutOffPaymentDoctorSalarySlice from '@/store-redux/slices/cutOffPayment/doctor-salary/slice';
import cutOffPaymentHospitalSlice from '@/store-redux/slices/cutOffPayment/hospital-payment/slice';
import cutOffPaymentRefundToEmployerSlice from '@/store-redux/slices/cutOffPayment/refund-to-employer/slice';
import cutOffPaymentOtherSlice from '@/store-redux/slices/cutOffPayment/other-payment/slice';
import cutOffOfficeFundPaymentSlice from '@/store-redux/slices/cutOffPayment/officefund-payment/slice';
import cutOffPaymentWrongFundSlice from '@/store-redux/slices/cutOffPayment/wrongfund-payment/slice';

export const cutOffPaymentDoctor = {
  // export ไปให้ file index.tsx ในfolder (reducer)
  cutOffPaymentDoctorSalarySlice,
  cutOffPaymentHospitalSlice,
  cutOffPaymentRefundToEmployerSlice,
  cutOffPaymentOtherSlice,
  cutOffOfficeFundPaymentSlice,
  cutOffPaymentWrongFundSlice,
};
