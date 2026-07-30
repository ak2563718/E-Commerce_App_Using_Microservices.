import { createSlice } from "@reduxjs/toolkit";
import { createVariants, deleteVariants, getVariats, updateVariants } from "./variants.Action";

interface variants{
    variants:any[]|undefined,
    variant:any|undefined,
    loading:boolean,
    error:string|null,
    message:string|null,
}

const initialState:variants={
    variants:[],
    variant:{},
    loading:false,
    error:null,
    message:null,
}

const variantSlice = createSlice({
    name:'variants',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // 1. create product variants
        builder.addCase(createVariants.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
            state.variant = {};
        }).addCase(createVariants.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.variant = action.payload.data;
            state.variants?.push(...action.payload.data);
        }).addCase(createVariants.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "failed";
        });

        // 2. get product variants
        builder.addCase(getVariats.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
            state.variants = [];
        }).addCase(getVariats.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.variants = action.payload.data;
        }).addCase(getVariats.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "failed";
        });

        // 3. update product variants 
        builder.addCase(updateVariants.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
            state.variant = {};
        }).addCase(updateVariants.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.variant = action.payload.data;
            state.variants = state.variants?.map((v)=>v.id === action.payload.data.id?
                                action.payload.data:v)
        }).addCase(updateVariants.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "failed";
        });

        // 4. delete product variants 
        builder.addCase(deleteVariants.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(deleteVariants.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.variants = state.variants?.filter((v)=>v.id !==action.payload.data.id)
        }).addCase(deleteVariants.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "failed";
        })
    }
})

export default variantSlice.reducer;