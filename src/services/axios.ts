import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({ baseURL });

instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
instance.defaults.headers.common["Content-Type"] = "application/vnd.api+json";
instance.defaults.headers.common["Accept"] = "application/vnd.api+json";

const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = undefined;
      return window.location.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
