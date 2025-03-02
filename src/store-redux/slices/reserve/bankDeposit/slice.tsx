import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceName, initialState, DataMockupType, StateProps, FilterSearchType } from './types';
import { getBankDepositService } from './thunks';
import { RootState } from '@/store-redux/store';

const bankDepositSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFormDataSlice: (state, action: PayloadAction<DataMockupType>) => {
      return { ...state, ...action.payload };
    },
    setFilter: (state, action) => {
      state.filterSearch = { ...state, ...action.payload } as FilterSearchType;
      state.loadData = true;
    },
  },

  extraReducers(builder) {
    builder.addCase(getBankDepositService.pending, (state) => {
      state.loading = true;
      state.loadData = false;
    });
    builder.addCase(getBankDepositService.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(getBankDepositService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFormDataSlice, setFilter } = bankDepositSlice.actions;
export default bankDepositSlice.reducer;
export const bankDepositSelector = (state: RootState): StateProps => state.bankDepositSlice;
