import axiosInstance from './axiosInstance';


export const deleteBookFromLibrary = (token, id) =>
  axiosInstance.get(`/book/destroy/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });