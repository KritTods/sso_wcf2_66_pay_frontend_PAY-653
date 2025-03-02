import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageDetailType } from './types';
import { getDoctorSalaryDetailService, getDoctorSalaryService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayDoctorSalarySlice = createSlice({
  name: sliceName, // ดึงมาจาก type เพื่อกำหนดชื่อให้ slice
  initialState, //ดึงมาจากหน้า type เพื่อกำหนดค่าเรื่มต้น
  reducers: {
    //คือเอาไว้เขียน ฟังก์ชั่น อัพเดตค่าให้กับ initialState
    setFilter: (state, action) => {
      //state เข้าถึงinitialState ทั้งหมด action คือ ค่าใหม่ที่จะ set ค่าเข้าไป
      state.filter = { ...state, ...action.payload } as FilterSearchType; //action.payload คือค่าใหม่ที่ปาเข้ามา
      state.loading = true;
    },
    setPageDetail: (state, action) => {
      state.pageDetail = action.payload as PageDetailType;
    },
  },

  extraReducers(builder) {
    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3 tableList
    builder.addCase(getDoctorSalaryService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDoctorSalaryService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getDoctorSalaryService.rejected, (state) => {
      state.loading = false;
    });

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3 pageDetail
    builder.addCase(getDoctorSalaryDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDoctorSalaryDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getDoctorSalaryDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayDoctorSalarySlice.actions; //ใช้สำหรับ export ฟังก์ชั่น reducer
export default cancelCutOffPayDoctorSalarySlice.reducer; //เมื่อไหร่ที่สร้าง slice ต้อง export ไปให้ folder reducer ใช้
export const cancelCutOffPayDoctorSalarySelector = (state: RootState): StateProps =>
  state.cancelCutOffPayDoctorSalarySlice;
//ใช้สำหรับ export initialState ออกไปให้หน้าอื่นใช้
