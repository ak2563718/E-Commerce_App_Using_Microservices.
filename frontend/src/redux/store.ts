import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.Slice'
import categoryReducer from './category/category.Slice'
const store = configureStore({
    reducer:{
        auth:authReducer,
        category:categoryReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;