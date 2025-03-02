import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getOfficeFundService, getOfficeFundDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelOfficeFundSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
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

export const { setFilter } = cancelOfficeFundSlice.actions;
export default cancelOfficeFundSlice.reducer;
export const cancelOfficeFundSelector = (state: RootState): StateProps => state.cancelOfficeFundSlice;
