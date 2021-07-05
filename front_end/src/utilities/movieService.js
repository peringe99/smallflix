import axiosInstance from "./axios";

export async function category_get(history) {
  const response = await axiosInstance(history).get("/movie/category/");
  return response;
}

export async function movieInCategory(id, history) {
  const response = await axiosInstance(history).get(
    `/movie/moviesByCategory/${id}`
  );
  return response;
}
export async function movieSearch(title, history) {
  const response = await axiosInstance(history).get(`/movies/search/${title}`);
  return response;
}
