import { configureStore } from '@reduxjs/toolkit';
import jwtReducer from '../features/jwt/jwtSlice';

export const store = configureStore({
  reducer: {
    jwtBoolean: jwtReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;