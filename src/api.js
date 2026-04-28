import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// AUTH
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);

// BILLS
export const saveBill = (data) => API.post('/bills', data);
export const getBills = () => API.get('/bills');
export const deleteBill = (id) => API.delete(`/bills/${id}`);