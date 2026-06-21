import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('fullName');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        sessionStorage.setItem('sessionExpired', 'true');
        window.location.href = '/auth/Singin';
      }
      // Return a never-resolving promise so the calling code doesn't see a rejection
      return new Promise(() => {});
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
