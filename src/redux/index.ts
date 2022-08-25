import { configureStore } from '@reduxjs/toolkit'
import productsSlice from "./productsSlice";
import authSlice from "./authSlice";
import ProductSlice from "./ProductSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productsSlice,
        product: ProductSlice,
        cart: cartSlice
    },
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;