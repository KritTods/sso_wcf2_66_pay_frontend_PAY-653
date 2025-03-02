import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageFormType } from './types';
import { getWrongFundService, getWrongFundDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cutOffPaymentWrongFundSlice = createSlice({
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
    builder.addCase(getWrongFundService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWrongFundService.fulfilled, (state, action) => {
      state.loading = false;
      state.resultFilter = action.payload;
    });
    builder.addCase(getWrongFundService.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getWrongFundDetailService.pending, (state) => {
      state.loading = true;
    });
    //TODO: ต้องการส่ง action ไปที่ slice อื่น (fix build)
    builder.addCase(getWrongFundDetailService.fulfilled, (state) => {
      state.loading = false;
      // state.pageDetail = action.payload;
    });
    //  builder.addCase(getWrongFundDetailService.fulfilled, (state, action) => {
    //    state.loading = false;
    //    state.pageDetail = action.payload;
    //  });
    builder.addCase(getWrongFundDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = cutOffPaymentWrongFundSlice.actions;
export default cutOffPaymentWrongFundSlice.reducer;
export const cutOffPaymentWrongFundSelector = (state: RootState): StateProps => state.cutOffPaymentWrongFundSlice;
