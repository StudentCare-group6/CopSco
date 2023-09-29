import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL:    BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});
