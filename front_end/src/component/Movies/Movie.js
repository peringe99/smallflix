import React, { useEffect, useState } from "react";
import { movieInCategory } from "../../utilities/movieService";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Category.css";

const Movie = ({ type, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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
  // Options for react-youtube
  const opts = {
    height: "400px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie.original_title || movie.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);

          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return loading ? (
    <h3>loading</h3>
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <div>
      <div className="row__posters">
        {!loading &&
          movies.map(
            (movie) =>
              movie !== undefined &&
              movie.backdrop_path !== null && (
                <img
                  key={movie._id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={` ${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title}
                  onClick={() => handleClick(movie)}
                />
              )
          )}
      </div>

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Movie;
