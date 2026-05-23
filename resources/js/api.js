import axios from "axios";

// Configure Axios defaults for Laravel Sanctum cookie-based auth
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Create API instance with base URL pointing to backend API prefix
const api = axios.create({
    baseURL: "/api",
});

// Setup interceptor to handle session expiration (redirect to login if unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // If the user gets an unauthorized error while in the admin section, redirect to login
            if (window.location.pathname.startsWith("/admin") && !window.location.pathname.endsWith("/login")) {
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
