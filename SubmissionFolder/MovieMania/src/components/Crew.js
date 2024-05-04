import React from "react";

export default function Crew({ movieData }) {
  return (
    <div className="container-fluid px-5 mt-5">
      <div className="card">
        <div className="card-header bg-dark text-white">Crew</div>
        <div className="card-body">
          <div className="directors-section">
            <h5 className="section-title">Directing Crew</h5>
            <ul className="list-inline crew-list">
              {movieData && Array.isArray(movieData.directors)
                ? movieData.directors.map((director) => (
                    <li className="list-inline-item">{director} |</li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="writers-section">
            <h5 className="section-title">Writing Crew</h5>
            <ul className="list-inline crew-list">
              {movieData && Array.isArray(movieData.writers)
                ? movieData.writers.map((writer) => (
                    <li className="list-inline-item">{writer} |</li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="cast-section">
            <h5 className="section-title">Cast</h5>
            <ul className="list-inline crew-list">
              {movieData && Array.isArray(movieData.cast)
                ? movieData.cast.map((actor) => (
                    <li className="list-inline-item">{actor} |</li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
