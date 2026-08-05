import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.Slice'
import categoryReducer from './category/category.Slice'
import productReducer from './product/product.Slice'
import userReducer from './user/user.Slice'
const store = configureStore({
    reducer:{
        auth:authReducer,
        category:categoryReducer,
        product:productReducer,
        user:userReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;