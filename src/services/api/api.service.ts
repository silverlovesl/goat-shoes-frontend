import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Serializable, APIError } from '../../models';

type errorHandlerFunc = (error: any) => any;

let apiErrorHandler: errorHandlerFunc;

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_ENDPOINT}` || 'http://localhost:5000',
  withCredentials: true,
  timeout: 30000,
});

let cancelTokenSource = axios.CancelToken.source();

export const callRequests = (message: string = 'unauthorized') => {
  console.warn(`Cancel all requests after${message}`);
  cancelTokenSource.cancel();
};

export const restoreRequests = () => {
  console.log(`%c Restore all requests`, 'color: #52c41a');
  cancelTokenSource = axios.CancelToken.source();
};

export const setApiErrorHandler = (handler: errorHandlerFunc) => {
  apiErrorHandler = handler;
};

API.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Put your bearer token here`;
    config.params = config.params || {};
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(undefined, (err) => {
  if (apiErrorHandler) {
    apiErrorHandler(err);
  }
  if (err.response) {
    return Promise.reject(err.response.data as APIError);
  } else {
    return Promise.reject(err);
  }
});
