import React, { useState, useEffect } from "react";

import { movieInCategory } from "../../utilities/movieService";
import "./Banner.css";

function Banner({ type }) {
  const [movie, setMovie] = useState();
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

        {/* 1 button */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
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
