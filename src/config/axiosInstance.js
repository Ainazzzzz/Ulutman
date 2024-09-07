import axios from 'axios';

const BASE_URL = import.meta.env.VITE_ULUTMAN_API;

export const axiosInstance = axios.create({
   baseURL: BASE_URL,
});

let store;

export const injectStore = _store => {
   store = _store;
};

axiosInstance.interceptors.request.use(
   config => {
      const updateConfig = { ...config };
      const { userData } = store.getState().auth;
      if (userData) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjU0OTQ5OTAsImV4cCI6MTcyNjA5OTc5MH0.j66eXrhmPFjuCHVuRxM7W3McGPy09mRZb8bE49Q0JmA`;
      }
      return updateConfig;
   },

   error => {
      return Promise.reject(error);
   },
);

axiosInstance.interceptors.response.use(
   response => {
      return Promise.resolve(response);
   },

   error => {
      return Promise.reject(error);
   },
);
