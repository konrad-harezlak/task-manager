import axios from 'axios';

const baseURL = "https://task-manager-backend-umxh.onrender.com";

const instance = axios.create({
  baseURL: baseURL,

});

export default instance;
