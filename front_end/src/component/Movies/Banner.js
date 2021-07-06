import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { movieInCategory } from "../../utilities/movieService";
import "./Banner.css";

function Banner({ type }) {
  const [movie, setMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await movieInCategory(type?._id)
        .then((response) => {
          setMovie(
            response.data[Math.floor(Math.random() * response.data.length - 1)]
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [type]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
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
  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("${movie?.backdrop_path}")`,
          backdropPosition: "center center",
        }}
      >
        {/* Background image */}
        <div className="banner__contents">
          {/* title */}
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          {/* 1 button */}
          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => handleClick(movie)}
            >
              {trailerUrl === "" ? "Play" : "Close"}
            </button>
          </div>

          {/* description */}
          <h1 className="banner__description">
            {truncate(movie?.overview, 200)}
          </h1>
        </div>
        <div className="banner___fadeBottom" />
      </header>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </>
  );
}

export default Banner;
