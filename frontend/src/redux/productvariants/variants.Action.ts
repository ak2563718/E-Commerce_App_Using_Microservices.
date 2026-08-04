import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";

const variant_uri = process.env.NEXT_PUBLIC_PRODUCT_URI;

// 1. create product variants
export const createVariants = createAsyncThunk<any, any, {rejectValue:string}>(
    'post/variants',
    async({id, sku, price, stock}, { rejectWithValue })=>{
        try {
            const { data } = await axios.post(`${variant_uri}/products/${id}/variants`,{
                sku,
                price,
                stock,
            },{
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

// 2. get product variants
export const getVariats = createAsyncThunk<any, string, {rejectValue:string}>(
    'get/varinats',
    async(id, { rejectWithValue})=>{
        try {
           const { data } = await axios.get(`${variant_uri}/products/${id}/variants`,{
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

// 3. update product variants 
export const updateVariants = createAsyncThunk<any, any, {rejectValue:string}>(
    'patch/variants',
    async({id, form}, {rejectWithValue})=>{
        try {
            const { data } = await axios.patch(`${variant_uri}/variants/${id}`,{form},{
                headers:{'Content-Type':'applicaton/json'},
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

// 4. delete product variants
export const deleteVariants = createAsyncThunk<any, string, {rejectValue:string}>(
    'delete/variants',
    async(id, {rejectWithValue})=>{
        try {
            const { data } = await axios.delete(`${variant_uri}/variants/${id}`,{
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