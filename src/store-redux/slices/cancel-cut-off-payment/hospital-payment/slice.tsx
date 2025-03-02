import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType, PageDetailType } from './types';
import { getHospitalDetailService, getHospitalService } from './thunks';
import { RootState } from '@/store-redux/store';

const cancelCutOffPayHospitalSlice = createSlice({
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
    builder.addCase(getHospitalService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHospitalService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getHospitalService.rejected, (state) => {
      state.loading = false;
    });

    //ฟังก์ชั่นสำหรับอัพเดตค่า จาก Api thunk จำเป็นต้องมี ทั้ง3 pageDetail
    builder.addCase(getHospitalDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHospitalDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getHospitalDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageDetail } = cancelCutOffPayHospitalSlice.actions; //ใช้สำหรับ export ฟังก์ชั่น reducer
export default cancelCutOffPayHospitalSlice.reducer; //เมื่อไหร่ที่สร้าง slice ต้อง export ไปให้ folder reducer ใช้
export const cancelCutOffPayHospitalSelector = (state: RootState): StateProps => state.cancelCutOffPayHospitalSlice;
//ใช้สำหรับ export initialState ออกไปให้หน้าอื่นใช้
