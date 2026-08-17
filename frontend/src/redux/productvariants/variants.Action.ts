import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";

const variant_uri = process.env.NEXT_PUBLIC_PRODUCT_URI;

type Variant = {
    id:string,
    [key:string]:unknown,
}

type ApiResponse<T> = {
    success:boolean,
    message:string, 
    data:T,
}

type VariantForm = {
    sku?:string,
    price?:string,
    stock?:string,
    costPrice?:string,
    weight?:string,
    color?:string,
    size?:string,
    barcode?:string,
}

type ProductVariantPayload = VariantForm & {
    id:string,
}

type UpdateVariantPayload = {
    id:string,
    form:VariantForm,
}

// 1. create product variants
export const createVariants = createAsyncThunk<ApiResponse<Variant>, ProductVariantPayload, {rejectValue:string}>(
    'post/variants',
    async(form, { rejectWithValue })=>{
        try {
            const { data } = await axios.post(`${variant_uri}/products/${form.id}/variants`,form,{
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
export const getVariats = createAsyncThunk<ApiResponse<Variant[]>, string, {rejectValue:string}>(
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
export const updateVariants = createAsyncThunk<ApiResponse<Variant>, UpdateVariantPayload, {rejectValue:string}>(
    'patch/variants',
    async({id, form}, {rejectWithValue})=>{
        try {
            const { data } = await axios.patch(`${variant_uri}/variants/${id}`,form,{
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

// 4. delete product variants
export const deleteVariants = createAsyncThunk<ApiResponse<Variant>, string, {rejectValue:string}>(
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
