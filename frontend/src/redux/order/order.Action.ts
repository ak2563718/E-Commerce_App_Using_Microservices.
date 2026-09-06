import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import axios from "axios";

const order_Uri = process.env.NEXT_PUBLIC_API_URI
// 1. create Shipping address 
export const createShippingAddress = createAsyncThunk<any, any, {rejectValue:string}>(
    'post/shippingAddress',
    async(form, { rejectWithValue })=>{
        try {
            const { data } = await api.post(`${order_Uri}/order/address`,form,{
                headers:{
                    'Content-Type':'application/json',
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

// 2. Get Shipping Address
export const getShippingAddress = createAsyncThunk<any, void, {rejectValue:string}>(
    'get/Address',
    async( _, { rejectWithValue })=>{
        try {
            const { data } = await api.get(`${order_Uri}/order/address`,{
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

// 3. update shipping address
export const updateShippingAddress = createAsyncThunk<any, any, { rejectValue:string }>(
    'patch/address',
    async({form, id}, { rejectWithValue })=>{
        try {
            const { data } = await api.patch(`${order_Uri}/order/address/${id}`,form,{
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

// 4. delete shipping address
export const deleteShippingAddress = createAsyncThunk<any, string, { rejectValue:string}>(
    'delete/address',
    async( id, { rejectWithValue })=>{
        try {
            const { data  } = await api.delete(`${order_Uri}/order/address/${id}`,{
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