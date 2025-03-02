import prepareSlice from '@/store-redux/slices/reserve/prepare/slice';
import bankDepositSlice from '@/store-redux/slices/reserve/bankDeposit/slice';
import cutOffPaySlice from '@/store-redux/slices/reserve/cut-off-pay/slice';

export const reserve = {
  cutOffPaySlice,
  prepareSlice,
  bankDepositSlice,
};
