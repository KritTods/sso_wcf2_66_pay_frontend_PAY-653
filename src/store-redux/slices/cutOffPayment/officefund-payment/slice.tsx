import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, OfficeFundDataType } from './types';
import { getOfficeFundService, getOfficeFundDetailService } from './thunks';
import { RootState } from '@/store-redux/store';
// import { PageFormType } from '../other-payment';

const cutOffOfficeFundPaymentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
    setPageForm: (state, action) => {
      state.pageForm = action.payload as OfficeFundDataType;
    },
  },

  extraReducers(builder) {
    builder.addCase(getOfficeFundService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOfficeFundService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getOfficeFundService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getOfficeFundDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOfficeFundDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getOfficeFundDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = cutOffOfficeFundPaymentSlice.actions;
export default cutOffOfficeFundPaymentSlice.reducer;
export const cutOffOfficeFundPaymentSelector = (state: RootState): StateProps => state.cutOffOfficeFundPaymentSlice;
