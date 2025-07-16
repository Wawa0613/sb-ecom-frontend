import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const OrderConfirmation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 清空购物车和相关本地存储
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("CHECKOUT_ADDRESS");
    localStorage.removeItem("client-secret");
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-10">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
      <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Back to Home</a>
    </div>
  );
};

export default OrderConfirmation;
