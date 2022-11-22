import axiosInstance from './axiosInstance';


export const getFavoriteBooks = (token) =>
  axiosInstance.get('/book/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });