import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, OfficeFundDataDetailType } from './types';
import { getcancelCutOffPayOfficeFundService, getcancelCutOffPayOfficeFundDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayOfficeFundSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
    setPageDetail: (state, action) => {
      state.pageDetail = action.payload as OfficeFundDataDetailType;
    },
  },

  extraReducers(builder) {
    builder.addCase(getcancelCutOffPayOfficeFundService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayOfficeFundService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getcancelCutOffPayOfficeFundService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getcancelCutOffPayOfficeFundDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayOfficeFundDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getcancelCutOffPayOfficeFundDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayOfficeFundSlice.actions;
export default cancelCutOffPayOfficeFundSlice.reducer;
export const cancelCutOffPayOfficeFundSelector = (state: RootState): StateProps => state.cancelCutOffPayOfficeFundSlice;
