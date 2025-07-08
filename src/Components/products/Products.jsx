import ProductCard from "../shared/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions/index";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter.js";
import{ RotatingLines } from 'react-loader-spinner';

import Paginations from "../shared/Paginations"; 

const Products = () => {
    useProductFilter(); // 让商品筛选和URL参数联动
    console.log("✅ Products.jsx is rendering!");
    
    // 通过 Redux 获取商品列表
    const {isLoading, errorMessage} = useSelector(
        (state) => state.errors
    );
    const {products, categories, pagination} = useSelector(
        (state) => state.products
    );
    console.log("🧪 Redux 中的 products 是：", products);

    const dispatch = useDispatch();

    // 组件加载时自动请求商品数据
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    console.log("isLoading:", isLoading, "errorMessage:", errorMessage);

    return (
        <div className="min-h-screen w-full bg-white text-black">
            <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
                
                { <Filter categories={categories ? categories : []}/> }
                <div className="min-h-[700px]">
                    {isLoading ? (
                        <div className="text-center text-gray-800 py-10 text-2xl font-bold">Loading...</div>
                    ) : errorMessage ? (
                        <div className="text-center text-red-600 py-10 text-2xl font-bold">{errorMessage}</div>
                    ) : (
                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {products && products.map((item, i) => <ProductCard key={i} {...item} />)}
                        </div>
                       
                    )}
                    <div className="flex justify-center pt-10">
                     <Paginations
                        numberOfPage={pagination?.totalPages}
                        totalProducts={pagination?.totalElements}
                    />
                    </div>
                    {/* <div className="flex justify-center pt-10">
                        <Paginations 
                            numberOfPage={pagination?.totalPages}
                            totalProducts={pagination?.totalElements}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
    console.log("Products component loaded");
}

export default Products;
