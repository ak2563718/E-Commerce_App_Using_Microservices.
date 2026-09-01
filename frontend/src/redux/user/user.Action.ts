import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/lib/axios";

const user_uri = process.env.NEXT_PUBLIC_API_URI;

// 1. create user profile
export const createProfile = createAsyncThunk<any, any,{rejectValue:string}>(
    'post/profile',
    async(email, {rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${user_uri}/user/users`,email,{
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
export const getProfile = createAsyncThunk<any, void, {rejectValue:string} >(
    'get/profile',
    async( _, {rejectWithValue})=>{
        try {
            const { data } = await api.get(`${user_uri}/user/users/me`,{
                headers:{'Content-Type':'application/json',
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
            const { data } = await api.patch(`${user_uri}/user/users/me`,info,{
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