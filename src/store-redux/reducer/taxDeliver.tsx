import cutOffPaymentTaxDeliverSlice from '@/store-redux/slices/tax-deliver/cut-off-payment/slice';
import readyToPaySlice from '@/store-redux/slices/tax-deliver/readytopay/slice';

export const taxDeliverCutOffPayment = {
  // export ไปให้ file index.tsx ในfolder (reducer)
  cutOffPaymentTaxDeliverSlice,
  readyToPaySlice,
};
