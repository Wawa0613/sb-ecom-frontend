import axios from 'axios';

// 确保 baseURL 格式正确，避免双斜杠问题
const backendUrl = import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080';
const baseURL = `${backendUrl.replace(/\/$/, '')}/api`;

const api=axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// 添加响应拦截器处理 token 过期
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // 只有在特定情况下才清除登录状态
        if (error.response?.status === 401) {
            // 检查是否是关键的认证接口失败
            const url = error.config?.url || '';
            const criticalAuthUrls = ['/auth/signin', '/auth/signup'];
            
            // 如果是关键认证接口失败，或者是连续的认证失败，才清除登录状态
            if (criticalAuthUrls.some(authUrl => url.includes(authUrl))) {
                localStorage.removeItem("auth");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("client-secret");
                
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
            // 对于其他 401 错误，只是记录但不清除登录状态
            console.log('Authentication required for:', url);
        }
        return Promise.reject(error);
    }
);

export default api;