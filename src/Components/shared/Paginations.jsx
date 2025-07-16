import{ Pagination } from '@mui/material'; // 引入 MUI 的 Pagination 组件
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
const Paginations=({ numberOfPage, totalProducts })=>{
    const [searchParams]=useSearchParams(); // 获取 URL 中的查询参数
    const pathname=useLocation().pathname; // 获取当前路径
    const params= new URLSearchParams(searchParams); // 创建一个新的 URLSearchParams 实例
    const navigate=useNavigate(); // 获取导航函数
   
    const paramValues=searchParams.get("page")
    ? Number(searchParams.get("page")) // 获取当前页码
    : 1; // 如果没有页码参数，默认为 1

    const onChangeHandler = (event, value) => {
        params.set("page", value.toString()); // 设置新的页码参数
        navigate(`${pathname}?${params}`); // 通过导航更新 URL
    };
    return(
        <Pagination
         count={numberOfPage} // 总页数default
        page={paramValues} // 当前页码
        siblingCount={0} // 相邻页码数量
         defaultPage={1} // 当前页码
        boundaryCount={2} // 边界页码数量   
        shape="rounded" // 分页按钮形状
        onChange={onChangeHandler}
    
        />  
    )
};
export default Paginations;