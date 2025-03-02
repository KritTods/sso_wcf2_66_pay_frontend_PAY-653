import { createSlice } from '@reduxjs/toolkit';
import { initialState, FilterSearchType, PageFormType, sliceName, StateProps } from '@/store-redux/slices/control-registration/hospital/types';
import { getControlRegistrationHospitalService, getControlRegistrationHospitalDetailService } from '@/store-redux/slices/control-registration/hospital/thunks';
import { RootState } from '@/store-redux/store';

const controlRegistrationHospitalSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload as FilterSearchType;
      state.loading = true;
    },
    setPageForm: (state, action) => {
      state.pageForm = action.payload as PageFormType;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getControlRegistrationHospitalService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationHospitalService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getControlRegistrationHospitalService.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getControlRegistrationHospitalDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationHospitalDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getControlRegistrationHospitalDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = controlRegistrationHospitalSlice.actions;
export default controlRegistrationHospitalSlice.reducer;
export const controlRegistrationHospitalSelector = (state: RootState): StateProps =>
  state.controlRegistrationHospitalSlice;
