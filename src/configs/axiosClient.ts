import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'https://server.aptech.io',
    timeout: 30000
})  