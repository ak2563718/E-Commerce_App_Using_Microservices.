import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/lib/axios";

const user_uri = process.env.NEXT_PUBLIC_USER_URI;

// 1. create user profile
export const createProfile = createAsyncThunk<any, any,{rejectValue:string}>(
    'post/profile',
    async(email, {rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${user_uri}/users`,email,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('something went wrong')
        }
    }
);

// 2. get user profile 
export const getProfile = createAsyncThunk<any, string, {rejectValue:string} >(
    'get/profile',
    async( token, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(`${user_uri}/users/me`,{
                headers:{'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
                },
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

// 3. update user profile
export const updateProfile = createAsyncThunk<any, any , {rejectValue:string}>(
    'patch/profile',
    async(info, { rejectWithValue })=>{
        try {
            const { data } = await axios.patch(`${user_uri}/users/me`,info,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('something went wrong')
        }
    }
)