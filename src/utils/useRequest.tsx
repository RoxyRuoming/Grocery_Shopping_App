import { useRef, useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

// 3. "T" become the passed ResponseType 
function useRequest<T>(url: string, method: Method, payload: AxiosRequestConfig) {
    // concepts related with sending requests
    // useState<T | null>(null)

    // 3. data type is defined as "ResponseType | null" (T | null)
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());

    const cancel = () => {
        controllerRef.current.abort();
    }

    const request = async () => {
        // clear previous request status and data
        setData(null);
        setError('');
        setLoaded(false);

        // send request
        try {
            const response = await axios.request<T>({
                url,
                method,
                signal: controllerRef.current.signal,
                data: payload
            });
            setData(response.data);
        } catch (e: any) {
            setError(e.message || 'unknown request error.')
        } finally {
            setLoaded(true);
        }
    }
    // 4. return data, the return type is "ResponseType | null" (T | null)
    return { data, error, loaded, request, cancel };
}

export default useRequest;