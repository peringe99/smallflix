import axiosInstance from "./axios";

export async function login(email, password) {
  const response = await axiosInstance().post("/login/", {
    email,
    password,
  });
  return response;
}
export async function register(name, email, password) {
  const response = await axiosInstance().post("/signup/", {
    name,
    email,
    password,
  });
  return response;
}

export async function checkIsAuthenticated(history) {
  const response = await axiosInstance(history).get("/isAuthenticated");
  return response;
}
