import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;