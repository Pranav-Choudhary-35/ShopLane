import {createSlice} from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
        totalPrice:0,
        totalItems:0,
    },
    reducers:{
    setItems:(state,action)=>{
        state.items=action.payload;
    },
    addItems:(state,action)=>{
        state.items.push(action.payload);   
    }
    }

});

export const {setItems,addItems}=cartSlice.actions;
export default cartSlice.reducer;