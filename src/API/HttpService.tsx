import axios from 'axios';

const http = axios.create({
  baseURL: 'http://192.168.0.106:5000/', //localhost ip (wifi)
  // baseURL: 'https://mcg-academy1.herokuapp.com/',  //heroku server
});

export default http;
