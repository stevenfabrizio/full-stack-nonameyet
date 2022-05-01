import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface translatingState {
  value: boolean;
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: translatingState = {
  //get our boolean from localstorage
  value: false,
};

export const translatingSlice = createSlice({
  name: 'translatingBoolean',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    stateTranslatingTrue: (state) => {
      state.value = true;
    },
    stateTranslatingFalse: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { stateTranslatingTrue, stateTranslatingFalse } = translatingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTranslating = (state: RootState) => state.translatingBoolean.value;

export default translatingSlice.reducer;
