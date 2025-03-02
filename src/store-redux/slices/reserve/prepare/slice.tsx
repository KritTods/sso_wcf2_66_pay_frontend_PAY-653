import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, StateProps, sliceName, DataFormPrepareType, DATA_INIT_PREPARE } from './types';
import { getBeginningBalanceService, seveFormPrepareService } from './thunks';
import { RootState } from '@/store-redux/store';

const prepareSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    clearFormPrepare: (state) => {
      //clear default initial form
      state.form = DATA_INIT_PREPARE;
    },
    setFormDataSlice: (state, action: PayloadAction<DataFormPrepareType>) => {
      //set form data from submit form
      state.form = { ...state.form, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(seveFormPrepareService.pending, (state) => {
      state.loadingSave = true;
    });
    builder.addCase(seveFormPrepareService.fulfilled, (state) => {
      state.loadingSave = false;
    });
    builder.addCase(seveFormPrepareService.rejected, (state) => {
      state.loadingSave = false;
    });

    builder.addCase(getBeginningBalanceService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBeginningBalanceService.fulfilled, (state, action) => {
      state.loading = false;
      state.form.beginningBalance = action.payload.beginningBalance;
      //สำหรับบันทึกข้อมูล เตรียมจ่าย
      state.form.broughtForwardAmount = action.payload.beginningBalance;
    });
    builder.addCase(getBeginningBalanceService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFormDataSlice, clearFormPrepare } = prepareSlice.actions;
export default prepareSlice.reducer;
export const prepareSelector = (state: RootState): StateProps => state.prepareSlice;
