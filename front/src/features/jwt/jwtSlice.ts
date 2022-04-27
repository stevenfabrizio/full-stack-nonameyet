import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface jwtState {
  value: boolean;
}

// Define the initial state using that type
const initialState: jwtState = {
  value: false,
};

export const jwtSlice = createSlice({
  name: 'jwtBoolean',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    stateTrue: (state) => {
      state.value = true;
    },
    stateFalse: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { stateTrue, stateFalse } = jwtSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectJwt = (state: RootState) => state.jwtBoolean.value;

export default jwtSlice.reducer;
