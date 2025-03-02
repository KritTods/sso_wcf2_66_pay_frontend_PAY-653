import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageDetailType } from './types';
import { getcancelCutOffPayWrongFundService, getcancelCutOffPayWrongFundDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayWrongFundSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
    setPageDetail: (state, action) => {
      state.pageDetail = action.payload as PageDetailType;
    },
  },

  extraReducers(builder) {
    builder.addCase(getcancelCutOffPayWrongFundService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayWrongFundService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getcancelCutOffPayWrongFundService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getcancelCutOffPayWrongFundDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayWrongFundDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getcancelCutOffPayWrongFundDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayWrongFundSlice.actions;
export default cancelCutOffPayWrongFundSlice.reducer;
export const cancelCutOffPayWrongFundSelector = (state: RootState): StateProps => state.cancelCutOffPayWrongFundSlice;
