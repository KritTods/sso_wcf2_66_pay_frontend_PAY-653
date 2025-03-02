import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getDoctorSalaryDetailService, getDoctorSalaryService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelDoctorSalarySlice = createSlice({
  name: sliceName, // ดึงมาจาก type เพื่อกำหนดชื่อให้ slice
  initialState, //ดึงมาจากหน้า type เพื่อกำหนดค่าเรื่มต้น
  reducers: {
    //คือเอาไว้เขียน ฟังก์ชั่น อัพเดตค่าให้กับ initialState
    setFilter: (state, action) => {
      //state เข้าถึงinitialState ทั้งหมด action คือ ค่าใหม่ที่จะ set ค่าเข้าไป
      state.filter = { ...state, ...action.payload } as FilterSearchType; //action.payload คือค่าใหม่ที่ปาเข้ามา
      state.loading = true;
    },
  },

  extraReducers(builder) {
    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3
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

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3
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

export const { setFilter } = cancelDoctorSalarySlice.actions; //ใช้สำหรับ export ฟังก์ชั่น reducer
export default cancelDoctorSalarySlice.reducer; //เมื่อไหร่ที่สร้าง slice ต้อง export ไปให้ folder reducer ใช้
export const cancelDoctorSalarySelector = (state: RootState): StateProps => state.cancelDoctorSalarySlice;
//ใช้สำหรับ export initialState ออกไปให้หน้าอื่นใช้
