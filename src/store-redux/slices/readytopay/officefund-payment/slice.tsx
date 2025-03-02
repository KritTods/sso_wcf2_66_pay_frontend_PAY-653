import { createSlice } from '@reduxjs/toolkit';
import { sliceName, initialState, StateProps } from './types';
import { RootState } from '@/store-redux/store';

const refundToEmployerSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  // extraReducers() {},
});

// export const {} = refundToEmployerSlice.actions;
export default refundToEmployerSlice.reducer;
export const refundToEmployerSelector = (state: RootState): StateProps => state.refundToEmployerSlice;
