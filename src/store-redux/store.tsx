import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import reducer from '@/store-redux/reducer';
import reducerDf from '@/redux/reducer';

export const store = configureStore({
  reducer: { ...reducer, ...reducerDf },
  devTools: process.env.NEXT_PUBLIC_DEV === 'dev',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
