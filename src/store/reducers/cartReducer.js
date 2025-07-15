const initialState = {
    cart: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalPrice: 0,
    cartId: null,
}

// 计算购物车总价的工具函数
const calculateTotalPrice = (cart) => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => {
        const price = Number(item.specialPrice) || 0;
        const qty = Number(item.quantity) || 0;
        return sum + price * qty;
    }, 0);
}

// 初始化时计算总价
const initState = {
    ...initialState,
    totalPrice: calculateTotalPrice(initialState.cart)
};

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_CART": {
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );
            let updatedCart;
            if(existingProduct) {
                updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return productToAdd;
                    } else {
                        return item;
                    }
                });
            } else {
                updatedCart = [...state.cart, productToAdd];
            }
            
            // 同步到 localStorage
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            
            return {
                ...state,
                cart: updatedCart,
                totalPrice: calculateTotalPrice(updatedCart),
            };
        }
        case "REMOVE_CART": {
            const filteredCart = state.cart.filter(
                (item) => item.productId !== action.payload.productId
            );
            
            // 同步到 localStorage
            localStorage.setItem("cartItems", JSON.stringify(filteredCart));
            
            return {
                ...state,
                cart: filteredCart,
                totalPrice: calculateTotalPrice(filteredCart),
            };
        }
        case "GET_USER_CART_PRODUCTS":
            return {
                ...state,
                cart: action.payload,
                totalPrice: Number(action.totalPrice) || calculateTotalPrice(action.payload),
                cartId: action.cartId,
            };
        case "CLEAR_CART":
            // 清空 localStorage 中的购物车
            localStorage.removeItem("cartItems");
            return { cart:[], totalPrice: 0, cartId: null};
        default:
            return state;
    }
}