import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface logindata{
    email:string,
    password:string,
}
interface updateData{
    id:string
    status:"APPROVED"|"REJECTED"
}
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

// 2. login api for seller
export const sellerLogin = createAsyncThunk<any,logindata, {rejectValue:string} >(
    'post/sellerlogin',
    async(form, { rejectWithValue })=>{
        try {
            const { data } = await axios.post('http://localhost:6001/api/auth/seller/login',form,{
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

// 3. logout api for seller
export const sellerLogout = createAsyncThunk<any, void, {rejectValue:string}>(
    'get/sellerlogout',
    async(_, {rejectWithValue})=>{
        try {
            const { data } = await axios.get('http://localhost:6001/api/auth/seller/logout',{
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

// 4. check seller session 
export const sellerCheckSession = createAsyncThunk<any, any, { rejectValue:string}>(
    'get/checksession',
    async(_, { rejectWithValue })=>{
        try {
            const { data } = await axios.get('http://localhost:6001/api/auth/seller/check-session',{
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

// 5. update seller status
export const updateSellerStatus = createAsyncThunk<any, updateData,{rejectValue:string}>(
    'patch/sellerStatus',
    async({id,status},{rejectWithValue})=>{
        try {
            const { data }= await axios.patch(`http://localhost:6001/api/auth/seller/status/${id}`,status,{
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