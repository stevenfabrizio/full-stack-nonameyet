import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface authState {
  value: boolean;
}

// Define the initial state using that type
// const initialState: jwtState = {
//   value: false,
// };

const initialState: authState = {
  //get our boolean from localstorage
  value: localStorage.getItem('LoggedInOrNot') === 'yes',
};

export const authSlice = createSlice({
  name: 'authBoolean',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    stateTrue: (state) => {
      state.value = true;
      localStorage.setItem('LoggedInOrNot', 'yes');
    },
    stateFalse: (state) => {
      state.value = false;
      localStorage.setItem('LoggedInOrNot', 'no');
    },
  },
});

// Action creators are generated for each case reducer function
export const { stateTrue, stateFalse } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.authBoolean.value;

export default authSlice.reducer;
