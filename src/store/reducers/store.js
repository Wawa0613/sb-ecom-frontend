import { configureStore } from '@reduxjs/toolkit';
import { ProductReducer } from './ProductReducer';
import { errorReducer } from './errorReducer';
import { cartReducer } from './cartReducer'; // Assuming you have a cart reducer

const cartItems = localStorage.getItem('cartItems') 
           ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState={
    carts: {
        cart: cartItems,
    },  
};

export const store = configureStore({
    reducer: { 
        products: ProductReducer,
        errors: errorReducer,
        carts: cartReducer,
    },
    preloadedState: initialState,
});
export default store;