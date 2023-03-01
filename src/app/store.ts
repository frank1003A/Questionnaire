import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import applicationFormSlice from 'redux/applicationFormSlice';
import propsSlice from 'redux/propsSlice';

export const store = configureStore({
  reducer: {
    applicationForm: applicationFormSlice,
    props: propsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
