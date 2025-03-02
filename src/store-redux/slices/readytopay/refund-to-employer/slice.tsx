import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getFilterListService } from './thunks';
import { RootState } from '@/store-redux/store';

const refundToEmployerSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state, ...action.payload } as FilterSearchType;
      state.loading = true;
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

export const { setFilter, setPageForm, clearFilter, clearAll } = refundToEmployerSlice.actions;
export default refundToEmployerSlice.reducer;
export const refundToEmployerSelector = (state: RootState): StateProps => state.refundToEmployerSlice;
