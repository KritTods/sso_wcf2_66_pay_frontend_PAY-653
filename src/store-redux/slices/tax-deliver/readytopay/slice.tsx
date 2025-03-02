import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps, FilterSearchType } from './types';
import { getFilterListService, getReadyToPayByIdService } from './thunks';
import { RootState } from '@/store-redux/store';

const readyToPaySlice = createSlice({
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
    setPageDetail: (state, action: PayloadAction<StateProps['pageForm']>) => {
      state.pageDetail = action.payload;
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
    builder.addCase(getReadyToPayByIdService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReadyToPayByIdService.fulfilled, (state, action) => {
      state.loading = false;
      state.pageDetail = action.payload;
    });
    builder.addCase(getReadyToPayByIdService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setFilter, setPageForm, setPageDetail, clearFilter, clearAll } = readyToPaySlice.actions;
export default readyToPaySlice.reducer;
export const readyToPaySelector = (state: RootState): StateProps => state.readyToPaySlice;
