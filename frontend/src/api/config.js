import axios from 'axios';

// 🌐 Dynamic API URL Resolution
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

// If we have an env var, use it. Otherwise, if not on localhost, use the current site's URL. 
// Finally, fallback to local dev URL.
const API_URL = import.meta.env.VITE_API_URL || (!isLocalhost ? window.location.origin : 'http://127.0.0.1:5000');

console.log('📡 [API] Connecting to:', API_URL);
if (!isLocalhost && API_URL.includes('localhost')) {
    console.warn('⚠️ [API] Warning: Production site is attempting to connect to localhost!');
}

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Add a request interceptor to debug outgoing requests
api.interceptors.request.use((config) => {
    // console.log(`🚀 [API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
}, (error) => {
    console.error('❌ [API Request Error]', error);
    return Promise.reject(error);
});

// Add a response interceptor for better error messages
api.interceptors.response.use((response) => response, (error) => {
    if (!error.response) {
        console.error('🌐 [Network Error] Server might be down at:', API_URL);
    } else {
        console.error(`❌ [API Error ${error.response.status}]`, error.response.data);
    }
    return Promise.reject(error);
});

export { API_URL };
export default api;
