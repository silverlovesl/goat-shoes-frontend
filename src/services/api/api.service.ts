import axios from 'axios';

type errorHandlerFunc = (error: any) => any;

let apiErrorHandler: errorHandlerFunc;

export const API = axios.create({
  baseURL: 'http://localhost:5000',
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
  console.log(err?.response);
  if (err.response) {
    return Promise.reject(err.response);
  } else {
    return Promise.reject(err);
  }
});
