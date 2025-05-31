// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
// import { configureStore } from '@reduxjs/toolkit'
// import productCategoryReducer from './slices/productCategorySlice'
// import productReducer from './slices/productSlice'
import cartReducer from './slice/cartSlice'
// import orderReducer from './slices/orderSlice'
// import collectionReducer from './slices/collectionSlice'
import customerReducer from './slice/customerSlice'
// import searchReducer from './slices/searchSlice'
// import heroSectionReducer from './slices/heroSectionSlice'
// import categoryReducer from './slices/categorySlice'
// import ordersReducer from './slices/orderSlice'
export const store = configureStore({
  reducer: {
    user: userReducer, cart: cartReducer,
       
        customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
