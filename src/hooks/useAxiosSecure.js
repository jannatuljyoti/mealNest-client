
import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';


const axiosSecure = axios.create({
  baseURL:`https://meal-nest-code-server.vercel.app`
  
});

const useAxiosSecure = () => {
  const {user} = useAuth();
  
   useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(config => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
