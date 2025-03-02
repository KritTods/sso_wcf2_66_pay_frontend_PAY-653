import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getOtherPaymentDetailService, getOtherPaymentService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelOtherPaymentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(getOtherPaymentService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOtherPaymentService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getOtherPaymentService.rejected, (state) => {
      state.loading = false;
    });

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3
    builder.addCase(getOtherPaymentDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOtherPaymentDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getOtherPaymentDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter } = cancelOtherPaymentSlice.actions;
export default cancelOtherPaymentSlice.reducer;
export const cancelOtherPaymentSelector = (state: RootState): StateProps => state.cancelOtherPaymentSlice;
