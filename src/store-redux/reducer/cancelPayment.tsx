import cancelDoctorSalarySlice from '@/store-redux/slices/cancel-payment/doctor-salary/slice';
import cancelHospitalPaymentSlice from '@/store-redux/slices/cancel-payment/hospital-payment/slice';
import cancelRefundToEmployerSlice from '@/store-redux/slices/cancel-payment/refund-to-employer/slice';
import cancelOtherPaymentSlice from '@/store-redux/slices/cancel-payment/other-payment/slice';
import cancelOfficeFundSlice from '@/store-redux/slices/cancel-payment/officefund-payment/slice';
import cancelWrongFundSlice from '@/store-redux/slices/cancel-payment/wrongfund-payment/slice';
import cancelTaxDeliverSlice from '@/store-redux/slices/cancel-payment/tax-deliver/slice';
import cancelReservePaymentSlice from '@/store-redux/slices/cancel-payment/reserve-payment/slice';

export const cancelPayment = {
  // export ไปให้ file index.tsx ในfolder (reducer)
  cancelDoctorSalarySlice,
  cancelHospitalPaymentSlice,
  cancelRefundToEmployerSlice,
  cancelOtherPaymentSlice,
  cancelOfficeFundSlice,
  cancelWrongFundSlice,
  cancelTaxDeliverSlice,
  cancelReservePaymentSlice,
};
