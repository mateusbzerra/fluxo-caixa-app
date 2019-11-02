import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'http://192.168.0.13:3333'
  //baseURL: '192.168.0.13:3333'
});

api.interceptors.request.use(
  async function(config) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.apikey = '123';
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default api;
