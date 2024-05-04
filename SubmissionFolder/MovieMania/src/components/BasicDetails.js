import React from "react";
import "./BasicDetails.css";

export default function BasicDetails({ movieData }) {
  console.log(movieData)
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="card">
            <h1>
            <div className="card-header bg-dark text-white">{ movieData.name}</div>
          </h1>
          <div className="row">
            <div className="col-md-2">
              <img
                src={ movieData.poster}
                className="card-img-top px-4"
                alt="Movie Poster"
              />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-outline-warning btn-block mb-4">
                      { movieData.duration}
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-outline-warning btn-block mb-4">
                      { movieData.release_year}
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-outline-success btn-block mb-3">
                      Metascore: {movieData.metascore}
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-outline-success btn-block mb-3">
                      IMDB: {movieData.rating}
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-outline-danger btn-block mb-3">
                      Movie Mania: {(movieData.movie_mania_rating == 0)?'Not Rated':movieData.movie_mania_rating}
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-outline-warning btn-block mb-3   ">
                      {movieData && Array.isArray(movieData.genre) ?movieData.genre.map((genre) => (genre + " ")): ''}
                    </button>

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-outline-danger btn-block mb-3   ">
                      {movieData && Array.isArray(movieData.languages) && movieData.languages.length>0? movieData.languages.map((language) => (language + " ")): 'English'}
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
