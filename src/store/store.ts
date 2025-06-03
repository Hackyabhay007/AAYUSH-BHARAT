import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slice/cartSlice'
import customerReducer from './slice/customerSlice'
// import searchReducer from './slices/searchSlice'
// import heroSectionReducer from './slices/heroSectionSlice'
// import categoryReducer from './slices/categorySlice'
// import ordersReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    // productCategories: productCategoryReducer,
    // categories: categoryReducer,
    // products: productReducer,
    cart: cartReducer,
    // order: orderReducer,
    // collections: collectionReducer,
    customer: customerReducer,
    // search: searchReducer,
    // heroSection: heroSectionReducer,
    // orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Add this if you get serialization errors
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch