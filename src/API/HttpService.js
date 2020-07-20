import axios from 'axios';

const http = axios.create({
  baseURL: 'http://192.168.1.47:5000/',
});

export default http;
