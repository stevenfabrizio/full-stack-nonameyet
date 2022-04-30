import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface enUrlState {
  value: string;
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: enUrlState = {
  //get our boolean from localstorage
  value: 'Richard_Wagner',
};

export const enUrlSlice = createSlice({
  name: 'enUrlString',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    enUrlState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { enUrlState } = enUrlSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectenUrl = (state: RootState) => state.enUrlString.value;

export default enUrlSlice.reducer;
