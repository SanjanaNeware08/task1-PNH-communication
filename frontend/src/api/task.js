import axios from 'axios';
import {getToken} from '../utils/auth';

const API = axios.create({baseURL:'http://localhost:5000/api'});
API.interceptors.request.use((req) => {
    const token = getToken();
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const createTask = (projectId, data) => API.post(`/tasks/${projectId}`,data);
export const getTasks = (projectId) => API.get(`/tasks/project/${projectId}`);
export const updateTask = (taskId, data) => API.put(`/tasks/task/${taskId}`,data);
export const deleteTask = (taskId) => API.delete(`/tasks/task/${taskId}`);