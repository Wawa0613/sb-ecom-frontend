// 引入 React 的 useState Hook，用于管理组件内部的状态
import React, { useState } from 'react';

// 引入 react-icons 里的一个图标组件（这里是一个小啤酒图标）
import { FaBeer } from 'react-icons/fa';

// 引入样式文件
import './App.css';

// 引入自定义组件 Products（商品页）和 Home（首页）
import Products from './Components/products/Products';
import Home from './Components/home/Home';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import Cart from './Components/cart/Cart';

// 引入 React Router 的核心模块
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/shared/Navbar';
import { Toaster } from 'react-hot-toast';
import LogIn from './Components/auth/LogIn';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Register from './Components/auth/Register';

/*
  App 组件是整个应用的根组件
*/
function App() {
  // 定义一个状态变量 count 和修改它的函数 setCount（暂时没用到）
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      {/* Router 组件是路由器，它负责在不同 URL 路径和组件之间建立映射 */}
      <Router>
        <Navbar />
        {/* Routes 组件是 Route 的容器，用来包裹所有的路由规则 */}
        <Routes>
          {/* Route 定义了路径和要渲染的组件 */}
          {/* 当访问 http://localhost:3000/ 时，渲染 Home 组件 */}
          <Route path="/" element={<Home />} />

          {/* 当访问 http://localhost:3000/products 时，渲染 Products 组件 */}
          <Route path="/products" element={<Products />} />
          <Route path='/about' element={ <About />}/>
          <Route path='/contact' element={ <Contact />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path='/' element={ <PrivateRoute /> } />
           <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

// 将 App 组件导出，以便在其他文件中使用
export default App;