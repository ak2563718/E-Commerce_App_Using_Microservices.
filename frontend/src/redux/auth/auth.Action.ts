import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const authuri = process.env.NEXT_PUBLIC_AUTH_URI;

interface signuprequest{
    email:string,
    password:string,
}
interface loginrequest{
    email:string,
    password:string,
}

// 1. Auth signup
export const authSignup = createAsyncThunk<any,signuprequest,{rejectValue:string}>(
    'auth/signup',
    async( formData, { rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${authuri}/register`,formData,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
           if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data?.message || "Signup failed")
           }
            return rejectWithValue("Unexpected error occurred");
        }
    }
)

// 2. Auth verify-email
export const authVerifyEmail = createAsyncThunk<any,string,{rejectValue:string}>(
    'auth/verifyemail',
    async(token, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(`${authuri}/verify-email`,{
                params:{
                    token
                }
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message || "Email verification failed")
            }
            return rejectWithValue("something went wrong")
        }
    }
)

// 3. Auth Login
export const authLogin = createAsyncThunk<any,loginrequest,{rejectValue:string}>(
    'auth/login',
    async(formData, {rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${authuri}/login`, formData,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message || "Login failed")
            }
            return rejectWithValue("something went wrong")
        }
    }
)

// 4. Auth Logout
export const authLogout = createAsyncThunk<any,void,{rejectValue:string}>(
    "auth/logout",
    async( _, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(`${authuri}/logout`,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message || "Logout failed")
            }
            return rejectWithValue("something went wrong")
        }
    }
)

// 5. Auth Check-session
export const authCheckSession = createAsyncThunk<any,void,{rejectValue:string}>(
    'auth/checksession',
    async( _, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(`${authuri}/check-session`,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message || "Check session return nothing")
            }
            return rejectWithValue("something went wrong")
        }
    }
)

// 6. Auth forgot Password
export const auth_ForgotPassword = createAsyncThunk<any,string,{rejectValue:string}>(
    "auth/forgotPassword",
    async(email , {rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${authuri}/forgot-password`,email,{
                headers:{'Content-Type':"application/json"},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data?.message)
            }
            return rejectWithValue("something went wrong")
        }
    }
);

// 7. Auth Reset- Password
export const auth_ResetPassword = createAsyncThunk<any,string,{rejectValue:string}>(
    'auth/resetPassword',
    async(password, {rejectWithValue})=>{
        try {
            const { data } = await axios.patch(`${authuri}/reset-password`,password,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue("something went wrong")
        }
    }
)