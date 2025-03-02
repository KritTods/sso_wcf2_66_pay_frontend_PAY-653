import otherPaymentSlice from '@/store-redux/slices/readytopay/other-pament/slice';
import readyToPayDoctorSalarySlice from '@/store-redux/slices/readytopay/doctor-salary/slice';
import hospitalPaymentSlice from '@/store-redux/slices/readytopay/hospital-payment/slice';
import refundToEmployerSlice from '@/store-redux/slices/readytopay/refund-to-employer/slice';
import officefundPayment from '@/store-redux/slices/readytopay/officefund-payment/slice';
import wrongFundPaymentPaySlice from '@/store-redux/slices/readytopay/wrongfund-payment/pay/slice';

export const readytopay = {
  readyToPayDoctorSalarySlice,
  hospitalPaymentSlice,
  refundToEmployerSlice,
  otherPaymentSlice,
  officefundPayment,
  wrongFundPaymentPaySlice,
};
