import { useRef, useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

function useRequest<T>(url: string, method: Method, payload: AxiosRequestConfig) {
    // concepts related with sending requests

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());

    const request = async () => {
        // clear previous request status and data
        setData(null);
        setError('');
        setLoaded(false);

        // send request
        return axios.request<T>({
            url,
            method,
            signal: controllerRef.current.signal,
            data: payload
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
    return { request };
}

export default useRequest;