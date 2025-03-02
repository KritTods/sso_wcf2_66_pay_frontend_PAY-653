import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getWrongFundService, getWrongFundDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelWrongFundSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(getWrongFundService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWrongFundService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getWrongFundService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getWrongFundDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWrongFundDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getWrongFundDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter } = cancelWrongFundSlice.actions;
export default cancelWrongFundSlice.reducer;
export const cancelWrongFundSelector = (state: RootState): StateProps => state.cancelWrongFundSlice;
