import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://192.168.56.1:8080/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
});