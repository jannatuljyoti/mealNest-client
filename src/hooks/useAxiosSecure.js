
import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    // ✅ Add token to headers
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await user?.getIdToken?.();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Properly eject request interceptor on cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  useEffect(() => {
    // ✅ Add response interceptor safely
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        console.log('inside response interceptor:', error);
        return Promise.reject(error); // ✅ Important for error handling
      }
    );

    // ✅ Eject response interceptor on cleanup
    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
