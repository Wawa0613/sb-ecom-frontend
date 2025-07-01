import { useState } from 'react'
import { FaBeer } from 'react-icons/fa';
import './App.css'
import Products from './Components/Products';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white text-2xl font-bold">
      <div className="mb-8">
        Welcome <FaBeer />
      </div>

      <Products />
      <div>✅ Products 加载啦！</div>
    </div>
  );
}

export default App
