import axios from 'axios';
import { getSessionId } from './utils';
/** Configured Axios instance with session header and error handling */
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 120_000,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config) => {
    const sessionId = getSessionId();
    config.headers['x-session-id'] = sessionId;
    return config;
});
api.interceptors.response.use((response) => {
    const sessionId = response.headers['x-session-id'];
    if (typeof sessionId === 'string' && sessionId) {
        localStorage.setItem('portfolioforge_session_id', sessionId);
    }
    return response;
}, (error) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred';
        const apiError = new Error(message);
        apiError.status = error.response?.status;
        apiError.code = error.code;
        return Promise.reject(apiError);
    }
    return Promise.reject(error);
});
/** Upload resume with portfolioId */
export function uploadResume(portfolioId, file, onProgress) {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('portfolioId', portfolioId);
    return api
        .post('/portfolio/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
            if (event.total && onProgress) {
                onProgress(Math.round((event.loaded * 100) / event.total));
            }
        },
    })
        .then((res) => res.data);
}
/** Upload media image */
export function uploadMedia(portfolioId, file, onProgress) {
    const formData = new FormData();
    formData.append('media', file);
    formData.append('portfolioId', portfolioId);
    return api
        .post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
            if (event.total && onProgress) {
                onProgress(Math.round((event.loaded * 100) / event.total));
            }
        },
    })
        .then((res) => res.data);
}
