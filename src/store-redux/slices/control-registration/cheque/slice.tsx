import { createSlice } from '@reduxjs/toolkit';
import { initialState, StateProps, FilterSearchType, PageFormType, sliceName } from './types';
import { RootState } from '@/store-redux/store';
import { getControlRegistrationChequeService, getControlRegistrationChequeDetailService } from './thunks';

const controlRegistrationChequeSlice = createSlice({
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
    builder.addCase(getControlRegistrationChequeService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationChequeService.fulfilled, (state, action) => {
      state.loading = false;
      state.tableList = action.payload;
    });
    builder.addCase(getControlRegistrationChequeService.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getControlRegistrationChequeDetailService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getControlRegistrationChequeDetailService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getControlRegistrationChequeDetailService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm } = controlRegistrationChequeSlice.actions;
export default controlRegistrationChequeSlice.reducer;
export const controlRegistrationChequeSelector = (state: RootState): StateProps => state.controlRegistrationChequeSlice;
