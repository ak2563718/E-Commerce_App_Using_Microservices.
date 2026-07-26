import { createSlice } from "@reduxjs/toolkit";
import { auth_ForgotPassword, auth_ResetPassword, authCheckSession, authLogin, authLogout, authSignup } from "./auth.Action";

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
        // 1. authSignup extra-reducer
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
        });

        // 2. authLogin extra-reducer
        builder.addCase(authLogin.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(authLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload?.message;
            state.user = action.payload.user;
            state.islogin = true;
        }).addCase(authLogin.rejected,(state,action)=>{
            state.loading = false;
            state.islogin = false;
            state.error = action.payload??  "Login failed";
        });

        // 3. authLogout extra-reducer
        builder.addCase(authLogout.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(authLogout.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.islogin = false;
            state.user = {};
        }).addCase(authLogout.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "Logout failed";
        });

        // 4. authCheckSession
        builder.addCase(authCheckSession.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(authCheckSession.fulfilled,(state,action)=>{
            state.loading = false;
            state.islogin = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        }).addCase(authCheckSession.rejected,(state,action)=>{
            state.loading = false;
            state.islogin = false;
            state.error = action.payload??'check session not return anything';
        });

        // 5. authForgotPassword extra-reducer
        builder.addCase(auth_ForgotPassword.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(auth_ForgotPassword.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
        }).addCase(auth_ForgotPassword.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "forgot Password failed"
        });

        // 6. authResetPassword extra-reducer
        builder.addCase(auth_ResetPassword.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(auth_ResetPassword.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
        }).addCase(auth_ResetPassword.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? " Reset Password failed";
        })
    }
})

export default authSlice.reducer;