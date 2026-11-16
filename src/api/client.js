import { API_URL } from './config';

const TIMEOUT_MS = 8000;

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

async function request(path, { method = 'GET', body } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });
    } catch (e) {
        throw new ApiError('Не удалось связаться с сервером. Проверьте, что он запущен.', 0);
    } finally {
        clearTimeout(timer);
    }

    let data = null;
    try {
        data = await response.json();
    } catch (e) {
        data = null;
    }

    if (!response.ok) {
        const message = (data && data.error) || `Ошибка сервера (${response.status})`;
        throw new ApiError(message, response.status);
    }
    return data;
}

export const api = {
    getCities: (q = '') => request(`/api/cities${q ? `?q=${encodeURIComponent(q)}` : ''}`),
    getCity: (id) => request(`/api/cities/${id}`),
    getSubscriptions: () => request('/api/subscriptions'),
    createSubscription: (payload) =>
        request('/api/subscriptions', { method: 'POST', body: payload }),
};
