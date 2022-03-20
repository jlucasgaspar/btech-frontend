import axios from 'axios';

type Method = 'post' | 'put' | 'delete' | 'get';

type Response<T> = {
  data: T;
  type: 'ok';
} | {
  error: string;
  type: 'fail';
}

export const makeHttpRequest = async <T>(
  method: Method,
  url: string,
  body?: any
): Promise<Response<T>> => {
  const jwtToken = localStorage.getItem('bolttech::jwt');

  const Authorization = jwtToken ? `Bearer ${jwtToken}` : '';
  const baseURL = 'https://bolttech-api.herokuapp.com';

  const api = axios.create({ baseURL, headers: { Authorization } });

  try {
    const result = await api[method](url, body);

    return {
      type: 'ok',
      data: result.data,
    }
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.message) {
      return {
        type: 'fail',
        error: e.response.data.message
      }
    }

    return {
      type: 'fail',
      error: 'An unexpected error occurred.'
    }
  }
}