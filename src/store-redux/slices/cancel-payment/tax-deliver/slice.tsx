import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getTaxDeliverDetailService, getTaxDeliverService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelTaxDeliverSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(getTaxDeliverService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTaxDeliverService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getTaxDeliverService.rejected, (state) => {
      state.loading = false;
    });

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3
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

export const { setFilter } = cancelTaxDeliverSlice.actions;
export default cancelTaxDeliverSlice.reducer;
export const cancelTaxDeliverSelector = (state: RootState): StateProps => state.cancelTaxDeliverSlice;
