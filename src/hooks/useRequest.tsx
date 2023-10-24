import { useState, useRef, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';


const defaultRequestedConfig = {
  url: '/', method: 'GET', data: {}, params: {}
}

function useRequest<T>(options: AxiosRequestConfig = defaultRequestedConfig) {
  const [ data, setData ] = useState<T | null>(null);
  const [ error, setError ] = useState('');
  const [ loaded, setLoaded ] = useState(false);
  const controllerRef = useRef(new AbortController());
  const navigate = useNavigate();

  const cancel = () => {
    controllerRef.current.abort();
  }

  // useCallback is used to cache data
  const request = useCallback((requestOptions?: AxiosRequestConfig) => {
    // clear previous data
    setData(null);
    setError('');
    setLoaded(false);

    // while sending request, carry loginToken to backend
    const loginToken = localStorage.getItem('token');
    const headers = loginToken ? {
      token: loginToken
    } : {};

    return axios.request<T>({
      url: requestOptions?.url || options.url,
      method: requestOptions?.method || options.method,
      signal: controllerRef.current.signal,
      data: requestOptions?.data || options.data,
      params: requestOptions?.params || options.params,
      headers
    }).then(response => {
      setData(response.data);
      return response.data;
    }).catch((e: any) => {
      if(e?.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(e.message || 'unknown request error.');
      throw new Error(e);
    }).finally(() => {
      setLoaded(true);
    });
  }, [navigate, options])

  return { data, error, loaded, request, cancel }
}

export default useRequest;