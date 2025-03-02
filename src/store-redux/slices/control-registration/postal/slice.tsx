import { createSlice } from '@reduxjs/toolkit';
import { initialState, StateProps, FilterSearchType, PageFormType, sliceName } from './types';
import { RootState } from '@/store-redux/store';
import { getControlRegistrationPostalService, getControlRegistrationPostalDetailService } from './thunks';

const controlRegistrationPostalSlice = createSlice({
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

  extraReducers(builder) {
    builder.addCase(getControlRegistrationPostalService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationPostalService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getControlRegistrationPostalService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getControlRegistrationPostalDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationPostalDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getControlRegistrationPostalDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = controlRegistrationPostalSlice.actions;
export default controlRegistrationPostalSlice.reducer;
export const controlRegistrationPostalSelector = (state: RootState): StateProps => state.controlRegistrationPostalSlice;
