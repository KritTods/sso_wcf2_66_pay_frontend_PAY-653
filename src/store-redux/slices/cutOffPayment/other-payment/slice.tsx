import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageFormType } from './types';
import { getOtherService } from './thunks';
import { RootState } from '@/store-redux/store';

export const cutOffPaymentOtherSlice = createSlice({
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
    builder.addCase(getOtherService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOtherService.fulfilled, (state, action) => {
      state.loading = false;
      state.resultFilter = action.payload;
    });
    builder.addCase(getOtherService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = cutOffPaymentOtherSlice.actions;
export default cutOffPaymentOtherSlice.reducer;
export const cutOffPaymentOtherSelector = (state: RootState): StateProps => state.cutOffPaymentOtherSlice;
