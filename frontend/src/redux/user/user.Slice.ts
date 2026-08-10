import { createSlice } from "@reduxjs/toolkit";
import { createProfile, getProfile, updateProfile } from "./user.Action";
import { createAddress, deleteAddress, getAddresswithUserId, updateAddress } from "./address.type";

interface AddressData {
    id: string,
    [key:string]: unknown,
}

interface UserData {
    id?: string,
    firstName?: string,
    lastName?: string,
    name?: string,
    phone?: string,
    email?: string,
    gender?: string,
    dob?: string,
    avatar?: string,
    role?: string,
    addresses?: AddressData[],
    [key:string]: unknown,
}

interface data{
    user:UserData,
    message:string | null,
    error : string | null,
    loading : boolean,
    address:AddressData[]|undefined,
}

const initialState:data ={
    user:{},
    message:null,
    error:null,
    loading:false,
    address:[],
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // 1. create user profile
        builder.addCase(createProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(createProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.data;
        }).addCase(createProfile.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ?? 'failed';
        });

        // 2. get user profile
        builder.addCase(getProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(getProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.data;
        }).addCase(getProfile.rejected,(state,action)=>{
             state.loading = false;
            state.error = action.payload ?? 'failed';
        });

        // 3. update user profile
        builder.addCase(updateProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.data;
        }).addCase(updateProfile.rejected,(state,action)=>{
             state.loading = false;
            state.error = action.payload ?? 'failed';
        });

        // 4. create address
        builder.addCase(createAddress.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(createAddress.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.address?.push(action.payload.data);
        }).addCase(createAddress.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??'failed';
        });

        // 5. get Address
        builder.addCase(getAddresswithUserId.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(getAddresswithUserId.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.address = action.payload.data;
        }).addCase(getAddresswithUserId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??'failed';
        });

        // 6. delete address
        builder.addCase(deleteAddress.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(deleteAddress.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.address = state.address?.filter((a)=>a.id !== action.payload.data.id);
        }).addCase(deleteAddress.rejected,(state,action)=>{
            state.loading =false;
            state.error = action.payload??'failed';
        });

        // 7. update address
        builder.addCase(updateAddress.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(updateAddress.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.address = state.address?.map((a)=>a.id === action.payload.data.id ? action.payload.data : a);
        }).addCase(updateAddress.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??'failed';
        })
    }
})

export default userSlice.reducer;
