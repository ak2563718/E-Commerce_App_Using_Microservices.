import { createSlice } from "@reduxjs/toolkit";
import { clearCart, createCart, createCartItems, deleteCartItems, getCart, updateCartItems } from "./cart.Action";

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
        });

        // 3. create cart items
        builder.addCase(createCartItems.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(createCartItems.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.cartitems.push(action.payload.data)
        }).addCase(createCartItems.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? 'failed';
        });

        // 4. update cart items
        builder.addCase(updateCartItems.pending,(state,action)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(updateCartItems.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.cartitems = state.cartitems.map((c)=>c.id === action.payload?.data.id
                                ?action.payload.data:c)
        }).addCase(updateCartItems.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "failed";
        });

        // 5.delte cart items;
        builder.addCase(deleteCartItems.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(deleteCartItems.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.cartitems = state.cartitems.filter((c)=>c.id !== action.payload.data.id)
        }).addCase(updateCartItems.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? 'failed';
        });

        // 6. clear cart
        builder.addCase(clearCart.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(clearCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.cartitems =[];
        }).addCase(clearCart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "failed";
        })
    }
})

export default cartSlice.reducer