import axios from "axios";
import { baseURL } from "../consts/const";


export const instance = axios.create({
    baseURL: `${baseURL}`,
    timeout: 50000,
    headers: {
        Accept: 'application/json',
        'content-Type': 'application/json'
    },
});