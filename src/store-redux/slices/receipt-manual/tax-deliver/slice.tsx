import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageFormType } from './types';
import {
  getReceiptManualTaxDeliverDetailService,
  // getDoctorSalalyListService,
  // getAccidentListService,
  // saveDoctorSalalyService,
  // getHistoryByCidService,
  getReceiptManualTaxDeliverService,
} from './thunks';
import { RootState } from '@/store-redux/store';

const receiptManualTaxDeliverSlice = createSlice({
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
    builder.addCase(getReceiptManualTaxDeliverService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReceiptManualTaxDeliverService.fulfilled, (state, action) => {
      state.loading = false;
      state.resultFilter = action.payload;
    });
    builder.addCase(getReceiptManualTaxDeliverService.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getReceiptManualTaxDeliverDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReceiptManualTaxDeliverDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getReceiptManualTaxDeliverDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm, setPageDetail } = receiptManualTaxDeliverSlice.actions;
export default receiptManualTaxDeliverSlice.reducer;
export const receiptManualTaxDeliverSelector = (state: RootState): StateProps => state.receiptManualTaxDeliverSlice;
