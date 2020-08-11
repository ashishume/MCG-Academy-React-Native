import axios from 'axios';

const http = axios.create({
  baseURL: 'https://mcg-academy.herokuapp.com/',
});

export default http;
