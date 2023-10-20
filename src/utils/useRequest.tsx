import { useState, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

function useRequest<T>(options: AxiosRequestConfig = {
  url: '/', method: 'GET', data: {}, params: {}
}) {
  const [ data, setData ] = useState<T | null>(null);
  const [ error, setError ] = useState('');
  const [ loaded, setLoaded ] = useState(false);
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  }

  const request = (requestOptions?: AxiosRequestConfig) => {
    // clear previous data
    setData(null);
    setError('');
    setLoaded(false);

    return axios.request<T>({
      url: requestOptions?.url || options.url,
      method: requestOptions?.method || options.method,
      signal: controllerRef.current.signal,
      data: requestOptions?.data || options.data,
      params: requestOptions?.params || options.params,
    }).then(response => {
      setData(response.data);
      return response.data;
    }).catch((e: any) => {
      setError(e.message || 'unknown request error.');
      throw new Error(e);
    }).finally(() => {
      setLoaded(true);
    });
  }

  return { data, error, loaded, request, cancel }
}

export default useRequest;