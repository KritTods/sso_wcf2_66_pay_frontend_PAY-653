import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'wcf-component-lib/node_modules/antd';
import { TEXT } from 'wcf-component-lib/src/constants/message';
import {
  initialState,
  StateProps,
  PrepareBudgetFormType,
  DATA_INIT_CUTOFFPAY_FORM,
  sliceName,
  FilterSearch,
} from './types';
import { getPrepareBudgetService, getPrepareBudgetList, deletePrepareBudget } from './thunks';
import { RootState } from '@/store-redux/store';

const cutoffpaySlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    clearFormCutoffpay: (state) => {
      //clear default initial form
      state.form = DATA_INIT_CUTOFFPAY_FORM;
    },
    setFormDataSlice: (state, action: PayloadAction<PrepareBudgetFormType>) => {
      //set form data from submit form
      state.form = { ...state.form, ...action.payload };
    },
    setFilter: (state, action) => {
      //เซ็ตค่า filter ที่ส่งเข้ามาจาก action
      state.filter = { ...state.filter, ...action.payload } as FilterSearch;
      state.loadData = true; //ใช้สำหรับ Loading Table รอข้อมูล
    },
  },
  extraReducers(builder) {
    builder.addCase(getPrepareBudgetService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrepareBudgetService.fulfilled, (state, action) => {
      state.loading = false;
      state.info = action.payload;
    });
    builder.addCase(getPrepareBudgetService.rejected, (state) => {
      state.loading = false;
    });

    //Get List โหลดข้อมูลเบิกเงินทดรองจ่าย
    builder.addCase(getPrepareBudgetList.pending, (state) => {
      state.loadData = true;
      state.loadingBtnSearch = true;
      //เซตค่าเริ่มต้น
      state.list = [];
      state.totalElements = 0;
    });
    builder.addCase(getPrepareBudgetList.fulfilled, (state, action) => {
      state.loading = false;
      state.loadData = false;
      state.loadingBtnSearch = false;
      state.list = action.payload.content; //เซ็ตค่า content เข้า list สำหรับแสดงข้อมูลใน table
      state.totalElements = action.payload.totalElements; // เซ็ตค่า totalElements (จำนวนข้อมูลในตารางทั้งหมด)
    });
    builder.addCase(getPrepareBudgetList.rejected, (state) => {
      state.loading = false;
      state.loadData = false;

      state.loadingBtnSearch = false;
    });

    //delect
    builder.addCase(deletePrepareBudget.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePrepareBudget.fulfilled, (state) => {
      state.loading = false;
      state.loadData = true;
      void message.success(TEXT.delete.success);
    });
    builder.addCase(deletePrepareBudget.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFormDataSlice, clearFormCutoffpay, setFilter } = cutoffpaySlice.actions;
export default cutoffpaySlice.reducer;
export const cutOffPaySelector = (state: RootState): StateProps => state.cutOffPaySlice;
