import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageDetailType } from './types';
import { getcancelCutOffPayTaxDeliverService, getcancelCutOffPayTaxDeliverDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayTaxDeliverSlice = createSlice({
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
    builder.addCase(getcancelCutOffPayTaxDeliverService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayTaxDeliverService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getcancelCutOffPayTaxDeliverService.rejected, (state) => {
      state.loading = false;
    });

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3
    builder.addCase(getcancelCutOffPayTaxDeliverDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayTaxDeliverDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getcancelCutOffPayTaxDeliverDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayTaxDeliverSlice.actions;
export default cancelCutOffPayTaxDeliverSlice.reducer;
export const cancelCutOffPayTaxDeliverSelector = (state: RootState): StateProps => state.cancelCutOffPayTaxDeliverSlice;
