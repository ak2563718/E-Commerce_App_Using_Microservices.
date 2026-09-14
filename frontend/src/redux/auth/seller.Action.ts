import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. signup api for seller 
export const sellerSignup = createAsyncThunk<any, any, {rejectValue:string}>(
    'post/sellersignup',
    async(form, { rejectWithValue })=>{
        try {
            const { data } = await axios.post('http://localhost:6001/api/auth/seller/register',form,{
                headers:{'Content-Type':"application/json"},
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