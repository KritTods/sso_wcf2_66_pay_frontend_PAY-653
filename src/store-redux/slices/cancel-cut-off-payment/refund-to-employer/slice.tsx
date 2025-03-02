import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageDetailType } from './types';
import { getRefundToEmployerDetailService, getRefundToEmployerService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayRefundToEmployerSlice = createSlice({
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
    builder.addCase(getRefundToEmployerService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRefundToEmployerService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getRefundToEmployerService.rejected, (state) => {
      state.loading = false;
    });

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3
    builder.addCase(getRefundToEmployerDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRefundToEmployerDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getRefundToEmployerDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayRefundToEmployerSlice.actions;
export default cancelCutOffPayRefundToEmployerSlice.reducer;
export const cancelCutOffPayRefundToEmployerSelector = (state: RootState): StateProps =>
  state.cancelCutOffPayRefundToEmployerSlice;
