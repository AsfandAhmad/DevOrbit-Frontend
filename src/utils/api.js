import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: '/api', // ✅ works locally (proxy) and on Vercel
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add JWT token to every request if available
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;
