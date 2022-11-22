import axios from 'axios';


export default axios.create(({
  baseURL: 'https://internsapi.public.osora.ru/api',
}))
