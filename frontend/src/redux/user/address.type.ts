import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/lib/axios";

const user_uri = process.env.NEXT_PUBLIC_USER_URI;

// 1. create user address 
export const createAddress = createAsyncThunk<any, any, {rejectValue:string}>(
    'post/address',
    async( info, { rejectWithValue })=>{
        try {
            const { data } = await api.post(`${user_uri}/address`,info,{
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

// 2. get address with user id
export const getAddresswithUserId = createAsyncThunk<any, void, {rejectValue:string}>(
    'get/addresswithuserId',
    async( _ , {rejectWithValue} )=>{
        try {
            const { data } = await axios.get(`${user_uri}/address`,{
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

// 3. get address by id
export const getAddressbyId = createAsyncThunk<any, string, {rejectValue:string}>(
    'get/addressbyId',
    async(id, { rejectWithValue})=>{
        try {
            const { data } = await axios.get(`${user_uri}/address/${id}`,{
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

// 4. udpate address 
export const updateAddress = createAsyncThunk<any, any, {rejectValue:string}>(
    'patch/address',
    async({id,info}, {rejectWithValue})=>{
        try {
            const { data } = await axios.patch(`${user_uri}/address/${id}`,info,{
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

// 5. delete address 
export const deleteAddress = createAsyncThunk<any, string, {rejectValue:string}>(
    'delete/address',
    async(id, {rejectWithValue})=>{
        try {
            const { data } = await axios.delete(`${user_uri}/address/${id}`,{
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

// 6. update address default
export const updateDefaultAddress = createAsyncThunk<any, any, {rejectValue:string}>(
    'patch/default',
    async({id, value}, {rejectWithValue})=>{
        try {
            const { data } = await axios.patch(`${user_uri}/address/${id}/default`,value,{
                headers:{'Content-Type':'application/json'}
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