import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageDetailType } from './types';
import { getcancelCutOffPayOtherPaymentService, getcancelCutOffPayOtherPaymentDetailService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayOtherPaymentSlice = createSlice({
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
    builder.addCase(getcancelCutOffPayOtherPaymentService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayOtherPaymentService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getcancelCutOffPayOtherPaymentService.rejected, (state) => {
      state.loading = false;
    });

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3
    builder.addCase(getcancelCutOffPayOtherPaymentDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getcancelCutOffPayOtherPaymentDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getcancelCutOffPayOtherPaymentDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayOtherPaymentSlice.actions;
export default cancelCutOffPayOtherPaymentSlice.reducer;
export const cancelCutOffPayOtherPaymentSelector = (state: RootState): StateProps =>
  state.cancelCutOffPayOtherPaymentSlice;
