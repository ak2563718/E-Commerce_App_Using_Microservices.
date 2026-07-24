import { createSlice } from "@reduxjs/toolkit";
import { authSignup } from "./auth.Action";

interface state {
    users:any[]|null,
    user:any|null,
    loading:boolean,
    islogin:boolean,
    error:string|null,
    message:string|null,
}

const initialState:state={
    users:[],
    user:{},
    loading:false,
    islogin:false,
    error:null,
    message:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // 1. authSignup reducer
        builder.addCase(authSignup.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(authSignup.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
        }).addCase(authSignup.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "Signup failed";
        })

    }
})

export default authSlice.reducer;