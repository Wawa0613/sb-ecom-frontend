import {FaExclamationTriangle} from "react-icons/fa6";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
//useSelector：从 Redux store 里读取数据。
//useDispatch：获取 dispatch 方法，发起 action。
//useEffect：组件挂载时自动执行一次（类似生命周期的 componentDidMount）。
//dispatch(fetchProducts())：发起异步请求，获取商品数据。
const Product=()=>{ 
    //这段代码的作用是：组件加载时自动请求商品数据，
// 并把全局商品列表读到本地变量 products 里，供页面渲染使用。
    const isLoading=false;
    const errorMessage="";
    const products=useSelector((state)=>state.products.products)

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);
    return(
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {isLoading && <p>Loading...</p>}
            {errorMessage && (
                <p className="text-red-500">
                    <FaExclamationTriangle className="inline mr-1" />
                    {errorMessage}
                </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products && products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    )
}
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
     
   