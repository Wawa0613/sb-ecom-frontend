import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions/index";

const Products = () => {
    console.log("✅ Products.jsx is rendering!");
    
    // 通过 Redux 获取商品列表
    const products = useSelector((state) => state.products.products);
    console.log("🧪 Redux 中的 products 是：", products);

    const dispatch = useDispatch();

    // 组件加载时自动请求商品数据
    useEffect(() => {
        dispatch(fetchProducts("pageNumber=0&PageSize=50&sortBy=productId&sortOrder=asc"));
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {/* <Filter categories={categories ? categories : []}/> */}
            <div className="min-h-[700px]">
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                     {products && 
                        products.map((item, i) => <ProductCard key={i} {...item} />
                        )}
                </div>
                {/* <div className="flex justify-center pt-10">
                    <Paginations 
                        numberOfPage={pagination?.totalPages}
                        totalProducts={pagination?.totalElements}
                    />
                </div> */}
            </div>
        </div>
    )
    console.log("Products component loaded");
}

export default Products;
