import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    orderIds: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState: INITIAL_STATE,
    reducers: {
        setOrderids: (state, action) => {
            state.orderIds = action.payload;
        },
        addOrderid: (state, action) => {
            state.orderIds.push(action.payload);  
        },
        removeOrderid: (state, action) => {
            state.orderIds = state.orderIds.filter(id => id !== action.payload); 
        }
    }
});

export const { setOrderid , addOrderid, removeOrderid  } = orderSlice.actions;
export default orderSlice.reducer;
