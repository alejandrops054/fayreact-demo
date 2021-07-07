import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '@env';

const api = ({token = null} = {}) => {
  const api = axios.create({
    baseURL: API_URL,
  });
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  api.interceptors.response.use(
    response => response,
    error => {
      console.log(error);
      if (error.includes('401')) {
        SecureStore.deleteItemAsync('user');
        return Promise.reject({status: 401, errors: ['Unauthorized']});
      }
      if (error.includes('422')) {
        let errors = Object.values(error.data.errors || {});
        return Promise.reject({
          status: 422,
          errorsRaw: errors,
          errors: errors.reduce(error => error),
        });
      }
      console.error(error);

      return Promise.reject({status: error, errors: ['Oops!']});
    },
  );
  return api;
};
export default api;
