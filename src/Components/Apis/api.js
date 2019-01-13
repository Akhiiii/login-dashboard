import axios from 'axios';

export const API_URL = 'http://192.168.2.119:8088/api/';

export default axios.create({
  baseURL: API_URL,
  headers: {'x-access-token': sessionStorage.getItem('jwtToken')}
});
