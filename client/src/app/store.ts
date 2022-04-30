import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import nonEnUrlReducer from '../features/nonEnUrl/nonEnUrlSlice';
import enUrlReducer from '../features/enUrl/enUrlSlice'

export const store = configureStore({
  reducer: {
    authBoolean: authReducer,
    nonEnUrlString: nonEnUrlReducer,
    enUrlString: enUrlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
