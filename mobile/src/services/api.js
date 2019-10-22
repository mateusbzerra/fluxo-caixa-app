import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

api.interceptors.request.use(
  async function(config) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default api;
