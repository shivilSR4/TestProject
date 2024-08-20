import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice';
import general from './generalSlice';
import order from './orderid';

const store = configureStore({
  reducer: {
    user: user,
    general: general,
    order : order

  },
});

export default store;
