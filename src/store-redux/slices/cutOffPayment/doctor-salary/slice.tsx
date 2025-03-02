import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageFormType } from './types';
import {
  getDoctorSalaryDetailService,
  // getDoctorSalalyListService,
  // getAccidentListService,
  // saveDoctorSalalyService,
  // getHistoryByCidService,
  getDoctorSalaryService,
} from './thunks';
import { RootState } from '@/store-redux/store';

const cutOffPaymentDoctorSalarySlice = createSlice({
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
    builder.addCase(getDoctorSalaryService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDoctorSalaryService.fulfilled, (state, action) => {
      state.loading = false;
      state.resultFilter = action.payload;
    });
    builder.addCase(getDoctorSalaryService.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getDoctorSalaryDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDoctorSalaryDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getDoctorSalaryDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = cutOffPaymentDoctorSalarySlice.actions;
export default cutOffPaymentDoctorSalarySlice.reducer;
export const cutOffPaymentDoctorSalarySelector = (state: RootState): StateProps => state.cutOffPaymentDoctorSalarySlice;
