import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProductbyId, getAllProducts, getProductbyId, getProductWithSlug, sellerProduct, updateProductbyId } from "./product.Action";
import { uploadProductImage } from "./product.Type.Action";

interface data{
    product:any|undefined,
    products:any[]|undefined,
    message:string|null,
    error:string|null,
    loading:boolean,
}

const initialState:data ={
    product:{},
    products:[],
    message:null,
    error:null,
    loading:false,
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // 1. create product extra-reducer
        builder.addCase(createProduct.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(createProduct.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.product = action.payload.data;
            state.products?.push(action.payload.data);
        }).addCase(createProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??"failed";
        });

        // 2. get Seller Product
        builder.addCase(sellerProduct.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
            state.products = [];
        }).addCase(sellerProduct.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.products = action.payload.data;
        }).addCase(sellerProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?? 'failed';
        })

        // 2.1 get all products extra -reducer
        builder.addCase(getAllProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.products = action.payload.data;
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??"failed";
        });

        // 3. get product by id extra -reducer
        builder.addCase(getProductbyId.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(getProductbyId.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.product = action.payload.data;
        }).addCase(getProductbyId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??"failed";
        });

        // 4. get product with slug
        builder.addCase(getProductWithSlug.pending,(state)=>{
            state.loading = true;
            state.message = null;
            state.error = null;
        }).addCase(getProductWithSlug.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.product = action.payload.data;
        }).addCase(getProductWithSlug.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??"failed";
        });

        // 5. update product by Id
        builder.addCase(updateProductbyId.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(updateProductbyId.fulfilled,(state,action)=>{
            state.loading = true;
            state.message = action.payload.message;
            state.products = state.products?.map((p)=>p.id===action.payload.data.id?
                                action.payload.data:p)
        }).addCase(updateProductbyId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??"failed"; 
        });

        // 6. delete product by Id
        builder.addCase(deleteProductbyId.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(deleteProductbyId.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.products = state.products?.filter((p)=>p.id !==action.payload.data.id)
        }).addCase(deleteProductbyId.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??"failed";
        });

        // 7. uploading images 
        builder.addCase(uploadProductImage.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(uploadProductImage.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
        }).addCase(uploadProductImage.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload??"Upload failed";
        })
    }
});

export default productSlice.reducer;