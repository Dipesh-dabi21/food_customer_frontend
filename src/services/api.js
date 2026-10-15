import axios from "axios";

export const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:5000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            error.message =
                error.response.data?.message || error.message;
        }

        return Promise.reject(error);
    }
);

export function getApiData(response) {
    return response?.data?.data ?? response?.data;
}
