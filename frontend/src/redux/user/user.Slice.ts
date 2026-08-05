import { createSlice } from "@reduxjs/toolkit";
import { createProfile, getProfile, updateProfile } from "./user.Action";


interface data{
    user:any | undefined,
    message:string | null,
    error : string | null,
    loading : boolean,
}

const initialState:data ={
    user:{},
    message:null,
    error:null,
    loading:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // 1. create user profile
        builder.addCase(createProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(createProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.data;
        }).addCase(createProfile.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ?? 'failed';
        });

        // 2. get user profile
        builder.addCase(getProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(getProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.data;
        }).addCase(getProfile.rejected,(state,action)=>{
             state.loading = false;
            state.error = action.payload ?? 'failed';
        });

        // 3. update user profile
        builder.addCase(updateProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.data;
        }).addCase(updateProfile.rejected,(state,action)=>{
             state.loading = false;
            state.error = action.payload ?? 'failed';
        })
    }
})

export default userSlice.reducer;