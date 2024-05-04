import React from "react";
import "./Reviews.css";
export default function Reviews({movieData}) {
  return (
    <div className="container-fluid px-5 text-center mt-5">
      <h3 className="mb-4">Reviews</h3>
      <div className="row">
        {(movieData && Array.isArray(movieData.reviews))?movieData.reviews.map((review, index) => (<div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{movieData.reviewers[index] }</h5>
              <p className="card-text">
                {review}
              </p>
            </div>
          </div>
        </div>)):''}
        
      </div>
    </div>
  );
}
