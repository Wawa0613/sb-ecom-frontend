import { configureStore } from '@reduxjs/toolkit';
import { ProductReducer } from './ProductReducer';
import { errorReducer } from './errorReducer';
import { cartReducer } from './cartReducer'; // Assuming you have a cart reducer
import { authReducer } from './authReducer'; // Assuming you have an auth reducer

const user=localStorage.getItem('auth') 
           ? JSON.parse(localStorage.getItem('auth')) : [];

const cartItems = localStorage.getItem('cartItems') 
           ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState={
    auth:{ user: user },
    carts: {
        cart: cartItems,
    },  
};

export const store = configureStore({
    reducer: { 
        products: ProductReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
    },
    preloadedState: initialState,
});
export default store;