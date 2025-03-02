import { createSlice } from '@reduxjs/toolkit';
import { initialState, StateProps, FilterSearchType, PageFormType, sliceName } from '@/store-redux/slices/control-registration/med/types';
import { RootState } from '@/store-redux/store';
import { getControlRegistrationMedDetailService, getControlRegistrationMedService } from '@/store-redux/slices/control-registration/med/thunks';

const controlRegistrationMedSlice = createSlice({
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
    builder.addCase(getControlRegistrationMedService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationMedService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getControlRegistrationMedService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getControlRegistrationMedDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationMedDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getControlRegistrationMedDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = controlRegistrationMedSlice.actions;
export default controlRegistrationMedSlice.reducer;
export const controlRegistrationMedSelector = (state: RootState): StateProps => state.controlRegistrationMedSlice;
