import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducers";

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const selectUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];

// 计算购物车总价的工具函数
const calculateTotalPrice = (cart) => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => {
        const price = Number(item.specialPrice) || 0;
        const qty = Number(item.quantity) || 0;
        return sum + price * qty;
    }, 0);
}

const initialState = {
    auth: { user: user, selectUserCheckoutAddress },
    carts: { 
        cart: cartItems,
        totalPrice: calculateTotalPrice(cartItems),
        cartId: null
    },
};

export const store = configureStore({
    reducer: {
        products: ProductReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
    },
    preloadedState: initialState,
});

export default store;