import axios from 'axios';

const api = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://devorbit-backend-production.up.railway.app/api' // ✅ must include `/api`
            : 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token automatically if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
