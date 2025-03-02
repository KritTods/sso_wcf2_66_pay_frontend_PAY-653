import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps } from './types';
import { RootState } from '@/store-redux/store';
import { getFilterListService } from './thunks';

const hospitalPaymentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<StateProps['filter']>) => {
      state.loading = true;
      state.filter = action.payload;
    },
    setPageForm: (state, action: PayloadAction<StateProps['pageForm']>) => {
      state.pageForm = action.payload;
    },
    clearFilter: (state) => {
      state.filter = initialState.filter;
      state.filterResult = initialState.filterResult;
    },
    clearAll: () => initialState,
  },

  extraReducers(builder) {
    //getFilter
    builder.addCase(getFilterListService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFilterListService.fulfilled, (state, action) => {
      state.loading = false;
      state.filterResult = action.payload.content;
      state.totalElements = action.payload.totalElements;
    });
    builder.addCase(getFilterListService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, clearAll, clearFilter, setPageForm } = hospitalPaymentSlice.actions;
export default hospitalPaymentSlice.reducer;
export const hospitalPaymentSelector = (state: RootState): StateProps => state.hospitalPaymentSlice;
