import { createSlice } from "@reduxjs/toolkit";
import { createCart, getCart } from "./cart.Action";

interface data{
    cart:any,
    cartitems:any[],
    loading:boolean,
    message:string | null,
    error:string | null,
}

const initialState:data ={
    cart:{},
    cartitems:[],
    loading:false,
    message:null,
    error:null,
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // 1. create slice
        builder.addCase(createCart.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(createCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.cart = action.payload.data;
        }).addCase(createCart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ?? 'failed';
        });

        // 2. get Slice
        builder.addCase(getCart.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(getCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.cart = action.payload.cart;
        }).addCase(getCart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? 'failed';
        })
    }
})