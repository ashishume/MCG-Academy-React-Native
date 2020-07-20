import axios from 'axios';

const http = axios.create({
  baseURL: 'http://192.168.43.120:5000/',
});

export default http;
