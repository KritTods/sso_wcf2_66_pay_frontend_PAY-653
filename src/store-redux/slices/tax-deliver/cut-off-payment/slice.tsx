import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageFormType } from './types';
import {
  getTaxDeliverDetailService,
  // getDoctorSalalyListService,
  // getAccidentListService,
  // saveDoctorSalalyService,
  // getHistoryByCidService,
  getTaxDeliverService,
} from './thunks';
import { RootState } from '@/store-redux/store';

const cutOffPaymentTaxDeliverSlice = createSlice({
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
    setPageDetail: (state, action) => {
      state.pageDetail = action.payload as PageFormType;
    },
  },

  extraReducers(builder) {
    builder.addCase(getTaxDeliverService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTaxDeliverService.fulfilled, (state, action) => {
      state.loading = false;
      state.resultFilter = action.payload;
    });
    builder.addCase(getTaxDeliverService.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getTaxDeliverDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTaxDeliverDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getTaxDeliverDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm, setPageDetail } = cutOffPaymentTaxDeliverSlice.actions;
export default cutOffPaymentTaxDeliverSlice.reducer;
export const cutOffPaymentTaxDeliverSelector = (state: RootState): StateProps => state.cutOffPaymentTaxDeliverSlice;
