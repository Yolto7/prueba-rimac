import axios from 'axios';

interface AxiosConfig {
  baseUrl: string;
}

export function getAxios(config: AxiosConfig) {
  const client = axios.create({
    headers: {
      common: {
        'Content-type': 'application/json',
      },
    },
    baseURL: config.baseUrl,
  });

  // set request axios
  client.interceptors.request.use(
    (request: any) => {
      return request;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  // set response axios
  client.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return client;
}
