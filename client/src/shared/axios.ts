import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "../consts";

export class Api {
    private api: AxiosInstance;

    private apiConfig: AxiosRequestConfig = {
        timeout: 15000,
        baseURL: BASE_URL,
        headers: {
            common: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    };

    constructor() {
        this.api = axios.create(this.apiConfig);

        this.api.interceptors.response.use((res: AxiosResponse) => res, (error: AxiosError) => {
            return Promise.reject(error.response?.data.message);
        });
    }

    public post<T, D, R = AxiosResponse<T>>(url: string, data: D, config?: AxiosRequestConfig): Promise<R> {
        return this.api.post(url, data, config);
    }
}