import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data when id changes.
    const getData = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      )
        .then(res => res.json())
        .then(data => setMovie(data));
    };

    getData();
    window.scrollTo(0, 0);
  }, [id]); // dependency list now includes 'id'

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt="Movie backdrop"
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt="Movie poster"
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map(genre => (
                    <span key={genre.id} className="movie__genre">
                      {genre.name}
                    </span>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", width: "60%" }}
          >
            <p style={{ width: "100%" }}>
              <span className="movie__imdbButton movie__Button" style={{ width: "100%" }}>
                IMDb <i className="newTab fas fa-external-link-alt" />
              </span>
            </p>
          </a>
        )}
      </div>
    </div>
  );
};

export default Movie;