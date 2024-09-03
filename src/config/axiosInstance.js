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
      const { token } = store.getState().auth;
      if (token) {
         updateConfig.headers.Authorization = `Bearer ${token}`;
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
