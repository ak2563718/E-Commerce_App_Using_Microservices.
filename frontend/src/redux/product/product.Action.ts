import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const product_uri = process.env.NEXT_PUBLIC_PRODUCT_URI;
// 1. create a product details
export const createProduct = createAsyncThunk<any,any,{rejectValue:string}>(
    'post/product',
    async(form, { rejectWithValue })=>{
        try {
            const { data } = await api.post(`${product_uri}/products`,form,{
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
);

// 2. get Product by sellerId
export const sellerProduct = createAsyncThunk<any, void, {rejectValue:string}>(
    'get/sellerProduct',
    async(_, { rejectWithValue})=>{
        try {
            const { data } = await api.get(`${product_uri}/products/seller`,{
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

// 2.1. get all products
export const getAllProducts = createAsyncThunk<any,void,{rejectValue:string}>(
    'get/Allproduct',
    async(_, { rejectWithValue })=>{
        try {
            const { data } = await axios.get(`${product_uri}/products`,{
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

// 3. get product by id
export const getProductbyId = createAsyncThunk<any,string,{rejectValue:string}>(
    'get/productbyId',
    async(id, { rejectWithValue })=>{
        try {
            const { data } = await axios.get(`${product_uri}/products/${id}`,{
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

// 4. get product by slug 
export const getProductWithSlug = createAsyncThunk<any,string,{rejectValue:string}>(
    'get/productbyslug',
    async(slug, { rejectWithValue })=>{
        try {
            const { data } = await axios.get(`${product_uri}/products/slug/${slug}`,{
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

// 5. update product by id
export const updateProductbyId = createAsyncThunk<any,any,{rejectValue:string}>(
    'update/product',
    async({id,form}, { rejectWithValue })=>{
        try {
            const {data} = await api.patch(`${product_uri}/products/${id}`,form,{
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

// 6. delete product by Id
export const deleteProductbyId = createAsyncThunk<any,string,{rejectValue:string}>(
    'delete/products',
    async(id, {rejectWithValue})=>{
        try {
           const { data } = await api.delete(`${product_uri}/products/${id}`,{
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

// 7. serach product 
export const searchProduct = createAsyncThunk<any, any, {rejectValue:string}>(
    'search/product',
    async(search, { rejectWithValue })=>{
        try {
            const { data } = await axios.get(`${product_uri}/searchproduct`,{
                params:{
                    search:search,
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