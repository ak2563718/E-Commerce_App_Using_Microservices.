import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import axios from "axios";

interface data{
    userId:string,
}
interface quantity{
    quantity:number
}
interface data2 extends quantity{
    cartId:string,
    variantId:string,
    productId:string,
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

// 3. create cartitems
export const createCartItems = createAsyncThunk<any, data2, {rejectValue:string} >(
    'post/cartItems',
    async(form, { rejectWithValue })=>{
        try {
            const { data } = await api.post(`${cart_uri}/carts/${form.cartId}/cartitems`,form,{
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

// 4. get cartitems
export const getCartItems = createAsyncThunk<any, string, {rejectValue:string}>(
    'get/cartitems',
    async(cartId, { rejectWithValue })=>{
        try {
            const { data } = await api.get(`${cart_uri}/carts/${cartId}/cartitems`,{
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

// 5. update cart items
export const updateCartItems = createAsyncThunk<any, any, {rejectValue:string}>(
    'patch/cartitems',
    async({cartitemId,quantity}, { rejectWithValue })=>{
        try {
           const { data } = await api.patch(`${cart_uri}/cartitems/${cartitemId}`,quantity,{
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

// 6. delete cart items
export const deleteCartItems = createAsyncThunk<any, string, {rejectValue:string}>(
    'delete/cartitems',
    async(cartItemId, { rejectWithValue})=>{
        try {
            const { data } = await api.delete(`${cart_uri}/cartitems/${cartItemId}`,{
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

// 7. clear cart 
export const clearCart = createAsyncThunk<any, string, {rejectValue:string}>(
    'delete/cart',
    async(cartId, { rejectWithValue })=>{
        try {
            const { data } = await api.delete(`${cart_uri}/carts/${cartId}`,{
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