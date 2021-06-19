import axios from 'axios';

const http = axios.create({
  baseURL: 'http://18.218.148.66:5000/',
  // baseURL: 'http://192.168.0.103:5000/',
});

export default http;
