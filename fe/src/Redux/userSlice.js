import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
