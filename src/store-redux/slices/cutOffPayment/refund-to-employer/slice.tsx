import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageFormType } from './types';
import { getRefundToEmployerService, getRefundToEmployerDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cutOffPaymentRefundToEmployerSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload as FilterSearchType;
      state.loading = true;
    },
    setPageForm: (state, action) => {
      state.pageForm = action.payload as PageFormType;
    },
  },

  extraReducers(builder) {
    builder.addCase(getRefundToEmployerService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRefundToEmployerService.fulfilled, (state, action) => {
      state.loading = false;
      state.resultFilter = action.payload;
    });
    builder.addCase(getRefundToEmployerService.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getRefundToEmployerDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRefundToEmployerDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getRefundToEmployerDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = cutOffPaymentRefundToEmployerSlice.actions;
export default cutOffPaymentRefundToEmployerSlice.reducer;
export const cutOffPaymentRefundToEmployerSelector = (state: RootState): StateProps =>
  state.cutOffPaymentRefundToEmployerSlice;
