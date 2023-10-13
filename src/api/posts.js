import axios from 'axios';
const BASE_URL = '';
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL:    BASE_URL,
    withCredentials: true
});
