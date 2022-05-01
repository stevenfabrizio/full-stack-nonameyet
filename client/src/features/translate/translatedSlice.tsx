import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface translatedState {
  value: boolean;
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: translatedState = {
  //get our boolean from localstorage
  value: false,
};

export const translatedSlice = createSlice({
  name: 'translatedBoolean',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    stateTranslatedTrue: (state) => {
      state.value = true;
    },
    stateTranslatedFalse: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { stateTranslatedTrue, stateTranslatedFalse } = translatedSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTranslated = (state: RootState) => state.translatedBoolean.value;

export default translatedSlice.reducer;
