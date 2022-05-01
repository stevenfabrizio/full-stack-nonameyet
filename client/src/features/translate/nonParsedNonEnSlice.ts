import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface nonParsedNonEnState {
  value: string;
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: nonParsedNonEnState = {
  //get our boolean from localstorage
  value: '',
};

export const nonParsedNonEnSlice = createSlice({
  name: 'nonParsedNonEnString',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    nonParsedNonEnState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nonParsedNonEnState } = nonParsedNonEnSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const nonParsedNonEnUrl = (state: RootState) => state.nonParsedNonEnString.value;

export default nonParsedNonEnSlice.reducer;
