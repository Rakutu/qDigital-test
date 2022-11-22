import axiosInstance from './axiosInstance';


export const createUser = (name, email, password, passwordConfirm) =>
  axiosInstance.post('/auth/signup', {
    name,
    email,
    password,
    password_confirmation: passwordConfirm,
  });