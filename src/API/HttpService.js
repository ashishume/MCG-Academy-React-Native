import axios from 'axios';

const http = axios.create({
  // baseURL: 'http://192.168.1.47:5000/',    //jio router wifi
  // baseURL: 'http://192.168.43.120:5000/', //samsung wifi
  baseURL: 'https://mcg-academy.herokuapp.com/',
});

export default http;
