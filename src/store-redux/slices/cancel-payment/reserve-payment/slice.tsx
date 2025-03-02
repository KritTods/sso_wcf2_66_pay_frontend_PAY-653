import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getReservePaymentService, getReservePaymentDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelReservePaymentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(getReservePaymentService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReservePaymentService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getReservePaymentService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getReservePaymentDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReservePaymentDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getReservePaymentDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter } = cancelReservePaymentSlice.actions;
export default cancelReservePaymentSlice.reducer;
export const cancelReservePaymentSelector = (state: RootState): StateProps => state.cancelReservePaymentSlice;
