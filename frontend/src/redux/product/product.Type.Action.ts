import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const type_uri = process.env.NEXT_PUBLIC_PRODUCT_URI;

type data={
    id:string,
    name:string,
}
type value ={
    id:string,
    value:string,
}
// 1. create product attribute name here id = productId
export const createAttributeName = createAsyncThunk<any, data, {rejectValue:string}>(
    'post/attributename',
    async({id,name},{rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${type_uri}/products/${id}/attributes`,name,{
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

// 2. update product attribute name here id= attributes id
export const updateAttributeName = createAsyncThunk<any, data, {rejectValue:string}>(
    'patch/attributesName',
    async({id,name},{ rejectWithValue })=>{
        try {
            const { data } = await axios.patch(`${type_uri}/attributes/${id}`,name,{
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

// 3. delete product attribute same here id = attributes id
export const deleteAttributesName = createAsyncThunk<any, string, {rejectValue:string}>(
    'delete/attributesName',
    async(id, { rejectWithValue})=>{
        try {
            const { data } = await axios.delete(`${type_uri}/attributes/${id}`,{
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

// 4. create attribute value here id = attribute id
export const createAttributeValue = createAsyncThunk<any, value,{rejectValue:string}>(
    'post/attributesvalue',
    async({id,value},{ rejectWithValue })=>{
        try {
            const { data } = await axios.post(`${type_uri}/attributes/${id}/values`,value,{
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

// 5. update attributes value, here id = attributesvalue id
export const updateAttributeValue = createAsyncThunk<any, value, {rejectValue:string}>(
    'patch/attributesvalue',
    async({id, value},{ rejectWithValue})=>{
        try {
            const { data } = await axios.patch(`${type_uri}/values/${id}`,value,{
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

// 6. delete attributes value,here id = attributesvalue id
export const deleteAttributesValue = createAsyncThunk<any, string, {rejectValue:string}>(
    'delete/attributesvalue',
    async(id, {rejectWithValue})=>{
        try {
            const { data } = await axios.delete(`${type_uri}/values/${id}`,{
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

// 7. upload product images, here id = product id
export const uploadProductImage = createAsyncThunk<any, any, { rejectValue:string}>(
    'post/images',
    async({id,formData}, {rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${type_uri}/products/${id}/images`,formData,{
                headers:{'Content-Type':'multipart/form-data'},
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

// 8. upload productimages variant, here id= productvariants id
export const uploadProductVariantImages = createAsyncThunk<any, any, {rejectValue:string}>(
    'post/variantimages',
    async({id,formData},{rejectWithValue})=>{
        try {
            const { data } = await axios.post(`${type_uri}/variants/${id}/images`,formData,{
                headers:{'Content-Type':'multipart/form-data'},
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