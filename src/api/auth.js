import api from "../utils/axiosConfig";
import axios from 'axios';

const LARAVEL_BASE_URL = 'http://localhost:8000';

export const login = async (email, password) => {
    try {
        await axios.get('/sanctum/csrf-cookie', {
        baseURL: LARAVEL_BASE_URL,
        withCredentials: true
        });
        
        const response = await api.post('/login', { email, password });
        
        localStorage.setItem('token', response.data.access_token);
        return response.data.user;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error.response?.data?.message || 'Error al iniciar sesión';
    }
};


export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getUser = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        localStorage.removeItem('token');
        throw error;
    }
};