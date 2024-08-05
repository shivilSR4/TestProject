import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';
import general from './generalSlice';

const store = configureStore({
  reducer: {
    user: user,
    general: general,
  },
});

export default store;
