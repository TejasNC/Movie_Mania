import React from "react";

import "./Recommendations.css";

/* top6 is an array of 6 json objects */
const RecommendationCarousel = ({ top6 }) => {
  return (
    <>
      <div className="container mt-5" id="Recommendation">
        <h2>Recommended Movies For You</h2>
      </div>
      <div className="container-fluid mt-4   ">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card">
                        <img
                          src={top6[0].poster}
                          className="card-img-top"
                          alt="Movie Poster"
                        />
                        <div className="card-footer">
                          <a href={`/Movie_Page/${top6[0].name}`}>
                            {top6[0].name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <img
                          src={top6[1].poster}
                          className="card-img-top"
                          alt="Movie Poster"
                        />
                        <div className="card-footer">
                          <a href={`/Movie_Page/${top6[1].name}`}>
                            {top6[1].name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <img
                          src={top6[2].poster}
                          className="card-img-top"
                          alt="Movie Poster"
                        />
                        <div className="card-footer">
                          <a href={`/Movie_Page/${top6[2].name}`}>
                            {top6[2].name}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card">
                        <img
                          src={top6[3].poster}
                          className="card-img-top"
                          alt="Movie Poster"
                        />
                        <div className="card-footer">
                          <a href={`/Movie_Page/${top6[3].name}`}>
                            {top6[3].name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <img
                          src={top6[4].poster}
                          className="card-img-top"
                          alt="Movie Poster"
                        />
                        <div className="card-footer">
                          <a href={`/Movie_Page/${top6[4].name}`}>
                            {top6[4].name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <img
                          src={top6[5].poster}
                          className="card-img-top"
                          alt="Movie Poster"
                        />
                        <div className="card-footer">
                          <a href={`/Movie_Page/${top6[5].name}`}>
                            {top6[5].name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4"></div>{" "}
                    {/* Empty column to maintain grid */}
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center mt-5">
        <h4>Please click on the Movie Name to view more details.</h4>
      </div>
    </>
  );
};

export default RecommendationCarousel;
