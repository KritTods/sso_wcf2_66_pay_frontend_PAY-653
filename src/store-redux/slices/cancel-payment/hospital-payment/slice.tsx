import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getHospitalPaymentDetailService, getHospitalPaymentService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelHospitalPaymentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(getHospitalPaymentService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHospitalPaymentService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getHospitalPaymentService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getHospitalPaymentDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHospitalPaymentDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getHospitalPaymentDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter } = cancelHospitalPaymentSlice.actions;
export default cancelHospitalPaymentSlice.reducer;
export const cancelHospitalPaymentSelector = (state: RootState): StateProps => state.cancelHospitalPaymentSlice;
