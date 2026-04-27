import axios, { AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const request = {
  get: <T,>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then((r) => r.data),
  post: <T,>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then((r) => r.data),
  put: <T,>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config).then((r) => r.data),
  patch: <T,>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.patch<T>(url, data, config).then((r) => r.data),
  delete: <T,>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then((r) => r.data),
};
