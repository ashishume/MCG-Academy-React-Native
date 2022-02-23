import axios from 'axios';

const http = axios.create({
  // baseURL: 'http://52.14.232.181:5000/',           //aws server
  // baseURL: 'http://192.168.6.165:5000/',       //localhost ip (mobile)
  baseURL: 'http://192.168.0.105:5000/',       //localhost ip (wifi)
  // baseURL: 'https://mcg-academy1.herokuapp.com/',  //heroku server
});

export default http;
