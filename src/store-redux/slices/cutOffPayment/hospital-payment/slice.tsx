import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageFormType } from './types';
import { getHospitalService } from './thunks';
import { RootState } from '@/store-redux/store';

const cutOffPaymentHospitalSlice = createSlice({
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
    builder.addCase(getHospitalService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHospitalService.fulfilled, (state, action) => {
      state.loading = false;
      state.resultFilter = action.payload;
    });
    builder.addCase(getHospitalService.rejected, (state) => {
      state.loading = false;
    });
    // builder.addCase(getHospitalDetailService.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(getHospitalDetailService.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.pageDetail = action.payload;
    // });
    // builder.addCase(getHospitalDetailService.rejected, (state) => {
    //   state.loading = false;
    // });
  },
});

export const { setFilter, setPageForm } = cutOffPaymentHospitalSlice.actions;
export default cutOffPaymentHospitalSlice.reducer;
export const cutOffPaymentHospitalSelector = (state: RootState): StateProps => state.cutOffPaymentHospitalSlice;
