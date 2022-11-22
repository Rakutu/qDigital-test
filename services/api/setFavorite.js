import axiosInstance from './axiosInstance';


export const setFavorite = (token, id, favorite) =>
  axiosInstance.post(`/book/update/${id}`, {
    favorite: favorite === 1 ? 0 : 1,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });