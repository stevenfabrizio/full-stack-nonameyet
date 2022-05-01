import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface nonEnUrlsState {
  value: string[];
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: nonEnUrlsState = {
  //get our boolean from localstorage
  value: [],
};

export const nonEnUrlsSlice = createSlice({
  name: 'nonEnUrlsString',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    nonEnUrlsState: (state, action) => {
      state.value = (state.value, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { nonEnUrlsState } = nonEnUrlsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNonEnUrls = (state: RootState) => state.nonEnUrlsArray.value;

export default nonEnUrlsSlice.reducer;
