import axios from 'axios';


export const getBooksBySubstring = (substring) =>
  axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: {
      q: substring,
    },
  });