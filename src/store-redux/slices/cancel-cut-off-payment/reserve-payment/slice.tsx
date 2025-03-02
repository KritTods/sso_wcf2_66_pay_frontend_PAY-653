import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, ReservePaymentDataDetailType } from './types';
import { getcancelCutOffPayReservePaymentService, getancelCutOffPayReservePaymentDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayReservePaymentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
    setPageDetail: (state, action) => {
      state.pageDetail = action.payload as ReservePaymentDataDetailType;
    },
  },

  extraReducers(builder) {
    builder.addCase(getcancelCutOffPayReservePaymentService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayReservePaymentService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getcancelCutOffPayReservePaymentService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getancelCutOffPayReservePaymentDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getancelCutOffPayReservePaymentDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getancelCutOffPayReservePaymentDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayReservePaymentSlice.actions;
export default cancelCutOffPayReservePaymentSlice.reducer;
export const cancelCutOffPayReservePaymentSelector = (state: RootState): StateProps =>
  state.cancelCutOffPayReservePaymentSlice;
