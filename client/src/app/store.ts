import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import nonEnUrlReducer from '../features/nonEnUrl/nonEnUrlSlice';
import enUrlReducer from '../features/enUrl/enUrlSlice';
import enUrlsReducer from '../features/enUrl/enUrlsSlice';
import nonEnUrlsReducer from '../features/nonEnUrl/nonEnUrlsSlice';
import translatingReducer from '../features/translate/translatingSlice';
import nonParsedNonEnReducer from '../features/translate/nonParsedNonEnSlice';
import nonParsedEnReducer from '../features/translate/nonParsedEnSlice';
import translatedReducer from '../features/translate/translatedSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    //are we authenticated or not?
    authBoolean: authReducer,

    //are we currently translating and have we already translated
    translatingBoolean: translatingReducer,
    translatedBoolean: translatedReducer,

    //the selected search result to be fetched.
    enUrlString: enUrlReducer,
    nonEnUrlString: nonEnUrlReducer,

    //the arrays of search results to select from
    enUrlsArray: enUrlsReducer,
    nonEnUrlsArray: nonEnUrlsReducer,

    //the non parsed content fetched from the search result
    nonParsedEnString: nonParsedEnReducer,
    nonParsedNonEnString: nonParsedNonEnReducer,

    //which language we will be translating from
    languageString: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
