import React, { useState, useEffect } from "react";

import { movieInCategory } from "../../utilities/movieService";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await movieInCategory("60d51deb6023240c6457563d")
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
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
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

        {/* 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List </button>
        </div>

        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 200)}
        </h1>
      </div>
      <div className="banner___fadeBottom" />
    </header>
  );
}

export default Banner;
