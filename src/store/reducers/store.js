import {configureStore}from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: { 
         products:ProductReducer,
        },
    preloadedState: {
    },
});
export default store;