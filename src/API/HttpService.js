import axios from 'axios';

const http = axios.create({
  baseURL: 'http://18.218.148.66:5000/',
  // baseURL: 'https://mcg-academy1.herokuapp.com/',
});

export default http;
