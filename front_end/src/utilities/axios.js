import axios from "axios";

const axiosInstance = (history = null) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      Accepted: "appication/json",
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 403 || error.response.status === 401) {
        sessionStorage.removeItem("token");
        if (history) {
          console.log("axios ", history.location);
          history.push(
            "/login",
            history.location?.state || history.location?.pathname
          );
        } else {
          window.location = "/login";
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );
  return axiosInstance;
};
export default axiosInstance;
