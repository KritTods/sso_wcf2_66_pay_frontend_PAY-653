import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps } from './types';
import { createWrongFundPaymentService, searchCompanyService, updateWrongFundPaymentService } from './thunks';
import { RootState } from '@/store-redux/store';

const wrongFundPaymentPaySlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers(builder) {
    //search company
    builder.addCase(searchCompanyService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchCompanyService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(searchCompanyService.rejected, (state) => {
      state.loading = false;
    });
    //create
    builder.addCase(createWrongFundPaymentService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createWrongFundPaymentService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createWrongFundPaymentService.rejected, (state) => {
      state.loading = false;
    });
    //update
    builder.addCase(updateWrongFundPaymentService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateWrongFundPaymentService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateWrongFundPaymentService.rejected, (state) => {
      state.loading = false;
    });
  },
});

// export const {} = wrongFundPaymentPaySlice.actions;
export default wrongFundPaymentPaySlice.reducer;
export const wrongFundPaymentPaySelector = (state: RootState): StateProps => state.wrongFundPaymentPaySlice;
