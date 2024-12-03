import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/systemMng/admin/noticeMng',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    } else {
      window.location.href = '/manager/auth/admin-login';
      throw new Error('No access token found');
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
