import { useState, useRef, useCallback, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from '../utils/message';

const defaultRequestedConfig = {
  url: '/', method: 'GET', data: {}, params: {}
}

// the default value of boolean is false
function useRequest<T>(options: AxiosRequestConfig & {manual?: boolean} = defaultRequestedConfig) {
  const [ data, setData ] = useState<T | null>(null);
  const [ error, setError ] = useState('');
  const [ loaded, setLoaded ] = useState(false);
  const controllerRef = useRef(new AbortController());
  const navigate = useNavigate();

  const cancel = () => {
    controllerRef.current.abort();
  }

  // useCallback is used to cache data
  const request = useCallback((requestOptions: AxiosRequestConfig) => {
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
      url: requestOptions.url,
      method: requestOptions?.method,
      signal: controllerRef.current.signal,
      data: requestOptions.data,
      params: requestOptions.params,
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
  }, [navigate])

  useEffect(() => {
    if (!options.manual) {
      request(options).catch(e => {
        message(e?.message);
      });
    }
  }, [options, request])

  return { data, error, loaded, request, cancel }
}

export default useRequest;