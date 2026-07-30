import { createSlice } from "@reduxjs/toolkit";
import { createCategories, deletecategorybyId, getAllCategories, getCategorybyId } from "./category.Action";

interface categoriesdata{
    categories:any[]|undefined,
    category:any|undefined,
    loading:boolean,
    message:string | null,
    error:string | null,
}

const initialState:categoriesdata = {
    categories:[],
    category:{},
    loading:false,
    message:null,
    error:null,
}

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // 1. create categories 
        builder.addCase(createCategories.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(createCategories.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.category = action.payload.data;
        }).addCase(createCategories.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload ?? "create category failed"
        });

        // 2. get all category
        builder.addCase(getAllCategories.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(getAllCategories.fulfilled,(state,action)=>{
            state.loading = false;
            state.categories = action.payload.data;
            state.message = action.payload.message;
        }).addCase(getAllCategories.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? "failed"
        });

        // 3. get category by id
        builder.addCase(getCategorybyId.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(getCategorybyId.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.category = action.payload.data;
        }).addCase(getCategorybyId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??'';
        })
        // 4. update category by id

        // 5. delete category by id
        builder.addCase(deletecategorybyId.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(deletecategorybyId.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.categories = state.categories?.filter((c)=>c.id !==action.payload.data.id)
        }).addCase(deletecategorybyId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??'deletion failed';
        })
    }
})