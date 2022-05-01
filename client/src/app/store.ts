import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import nonEnUrlReducer from '../features/nonEnUrl/nonEnUrlSlice';
import enUrlReducer from '../features/enUrl/enUrlSlice';
import enUrlsReducer from '../features/enUrl/enUrlsSlice';
import nonEnUrlsReducer from '../features/nonEnUrl/nonEnUrlsSlice'

export const store = configureStore({
  reducer: {
    authBoolean: authReducer,
    enUrlString: enUrlReducer,
    enUrlsArray: enUrlsReducer,
    nonEnUrlString: nonEnUrlReducer,
    nonEnUrlsArray: nonEnUrlsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
