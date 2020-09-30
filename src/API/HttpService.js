import axios from 'axios';

const http = axios.create({
  baseURL: 'https://mcg-academy1.herokuapp.com/',
  // baseURL: 'http://192.168.0.106:5000/',
});

export default http;
