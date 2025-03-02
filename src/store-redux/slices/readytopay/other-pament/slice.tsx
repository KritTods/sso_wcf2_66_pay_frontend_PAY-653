import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps } from './types';
import { RootState } from '@/store-redux/store';

const otherPaymentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setPageOtherPaymentDetail: (state, action: PayloadAction<StateProps['pageOtherPaymentDetail']>) => {
      state.pageOtherPaymentDetail = action.payload;
    },
  },
});

export const { setPageOtherPaymentDetail } = otherPaymentSlice.actions;
export default otherPaymentSlice.reducer;
export const otherPaymentSelector = (state: RootState): StateProps => state.otherPaymentSlice;
