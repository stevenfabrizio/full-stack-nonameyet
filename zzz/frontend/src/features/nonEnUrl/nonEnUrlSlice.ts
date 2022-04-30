import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface nonEnUrlState {
  value: string;
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: nonEnUrlState = {
  //get our boolean from localstorage
  value: 'Richard_Wagner',
};

export const nonEnUrlSlice = createSlice({
  name: 'nonEnUrlString',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    nonEnUrlState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nonEnUrlState } = nonEnUrlSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNonEnUrl = (state: RootState) => state.nonEnUrlString.value;

export default nonEnUrlSlice.reducer;
