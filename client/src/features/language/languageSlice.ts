import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface languageState {
  value: string;
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: languageState = {
  //get our boolean from localstorage
  value: 'De',
};

export const languageSlice = createSlice({
  name: 'languageString',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    languageState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { languageState } = languageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const languageUrl = (state: RootState) => state.languageString.value;

export default languageSlice.reducer;
