import axios from 'axios';
import {getToken} from '../utils/auth';

const API = axios.create({baseURL:'http://localhost:5000/api'});

API.interceptors.request.use((req) => {
    const token = getToken();
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const createProject = (title) => API.post('/projects',{title});