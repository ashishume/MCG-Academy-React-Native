import axios from 'axios';

const http = axios.create({
  baseURL: 'http://18.218.148.66:5000/',           //aws server
  // baseURL: 'http://192.168.0.106:5000/',       //localhost ip
  // baseURL: 'https://mcg-academy1.herokuapp.com/',  //heroku server
});

export default http;
