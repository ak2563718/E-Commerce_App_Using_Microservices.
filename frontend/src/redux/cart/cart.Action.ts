import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import axios from "axios";

interface data{
    userId:string,
}


const cart_uri = process.env.NEXT_PUBLIC_CART_URI;
// 1. create cart
export const createCart = createAsyncThunk<any, data, {rejectValue:string}>(
    'post/cart',
    async(userId, { rejectWithValue })=>{
        try {
           const { data } = await axios.post(`${cart_uri}/carts`,userId,{
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

// 2. Get cart
export const getCart = createAsyncThunk<any, void, {rejectValue:string}>(
    'get/cart',
    async(_, { rejectWithValue })=>{
        try {
           const { data } = await api.get(`${cart_uri}/carts`,{
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