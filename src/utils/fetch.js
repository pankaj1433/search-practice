import axios from "axios";

const baseURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const axiosInstance = axios.create({
  baseURL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use((config) => {
  console.log("API request", config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("API response", response);
    return response?.data;
  },
  (error) => {
    console.log("API response error", error);
    return Promise.reject(error);
  }
);

export const get = ({ url = "", options }) => axiosInstance.get(url, options);
