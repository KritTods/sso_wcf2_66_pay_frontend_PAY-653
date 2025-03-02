import cancelCutOffPayDoctorSalarySlice from '@/store-redux/slices/cancel-cut-off-payment/doctor-salary/slice';
import cancelCutOffPayHospitalSlice from '@/store-redux/slices/cancel-cut-off-payment/hospital-payment/slice';
import cancelCutOffPayRefundToEmployerSlice from '@/store-redux/slices/cancel-cut-off-payment/refund-to-employer/slice';
import cancelCutOffPayOtherPaymentSlice from '@/store-redux/slices/cancel-cut-off-payment/other-payment/slice';
import cancelCutOffPayWrongFundSlice from '@/store-redux/slices/cancel-cut-off-payment/wrongfund-payment/slice';
import cancelCutOffPayReservePaymentSlice from '@/store-redux/slices/cancel-cut-off-payment/reserve-payment/slice';
import cancelCutOffPayOfficeFundSlice from '@/store-redux/slices/cancel-cut-off-payment/officefund-payment/slice';
import cancelCutOffPayTaxDeliverSlice from '@/store-redux/slices/cancel-cut-off-payment/tax-deliver/slice';

export const cancelCutOffPayment = {
  // export ไปให้ file index.tsx ในfolder (reducer)
  cancelCutOffPayDoctorSalarySlice,
  cancelCutOffPayHospitalSlice,
  cancelCutOffPayRefundToEmployerSlice,
  cancelCutOffPayOtherPaymentSlice,
  cancelCutOffPayWrongFundSlice,
  cancelCutOffPayReservePaymentSlice,
  cancelCutOffPayOfficeFundSlice,
  cancelCutOffPayTaxDeliverSlice,
};
