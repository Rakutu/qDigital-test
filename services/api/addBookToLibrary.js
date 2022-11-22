import axiosInstance from './axiosInstance';


export const addBookToLibrary = ({ title, authors, description, favorite, uid }, token) =>
  axiosInstance.post('/book/add', {
    title,
    authors,
    description,
    favorite,
    uid,
  }, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });