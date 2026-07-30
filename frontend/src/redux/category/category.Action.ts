import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const product_uri = process.env.NEXT_PUBLIC_AUTH_URI;

// Categories all apis
// 1. create categories api
export const createCategories = createAsyncThunk<any,any,{rejectValue:string}>(
    'post/categories',
    async(form, { rejectWithValue })=>{
        try {
            const { data } = await axios.post(`${product_uri}/categories`,form,{
                headers:{'Content-Type':'application/json'},
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
)

// 2. get all categories 
export const getAllCategories = createAsyncThunk<any,void,{rejectValue:string}>(
    'get/categories',
    async(_, { rejectWithValue })=>{
        try {
            const { data } = await axios.get(`${product_uri}/categories`,{
                headers:{'Content-Type':'application/json'},
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
)

// 3. get category by id
export const getCategorybyId = createAsyncThunk<any,string,{rejectValue:string}>(
    'get/categorybyId',
    async(id, { rejectWithValue })=>{
        try {
            const { data } = await axios.get(`${product_uri}/categories/${id}`,{
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

// 5. delete category by id
export const deletecategorybyId = createAsyncThunk<any, string, {rejectValue:string}>(
    'delete/categoriesId',
    async( id, { rejectWithValue })=>{
        try {
           const { data } = await axios.delete(`${product_uri}/categories/${id}`,{
            headers:{'Content-Type':'application/json'},
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
)