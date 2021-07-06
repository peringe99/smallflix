import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { movieSearch } from "../../utilities/movieService";
import "./Search.css";

const Search = ({ searchTitle }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const movie_data = async () => {
      await movieSearch(searchTitle)
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
  }, [searchTitle]);
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
      <div className="search__posters">
        {!loading &&
          movies.map(
            (movie) =>
              movie !== undefined &&
              movie.backdrop_path !== null && (
                <img
                  key={movie._id}
                  className="search__poster"
                  src={` ${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title}
                  onClick={() => handleClick(movie)}
                />
              )
          )}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Search;
