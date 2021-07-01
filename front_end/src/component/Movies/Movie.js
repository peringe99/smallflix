import React, { useEffect, useState } from "react";
import { movieInCategory } from "../../utilities/movieService";
import "./Category.css";

const Movie = ({ type, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const movie_data = async () => {
      await movieInCategory(type)
        .then((res) => {
          setLoading(true);
          setError("");

          setMovies(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response?.data.msg);
        });
    };
    movie_data();
  }, [type]);

  return loading ? (
    <h3>loading</h3>
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <>
      {!loading &&
        movies.map(
          (movie) =>
            movie !== undefined &&
            movie.backdrop_path !== null && (
              <img
                key={movie._id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={` ${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.title}
              />
            )
        )}
    </>
  );
};

export default Movie;
