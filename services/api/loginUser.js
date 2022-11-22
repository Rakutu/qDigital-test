import axiosInstance from './axiosInstance';


export const loginUser = (email, password) =>
  axiosInstance.post('/auth/login', {
    email,
    password,
  });
