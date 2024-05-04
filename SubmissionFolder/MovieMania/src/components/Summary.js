import React from 'react'

export default function Summary({ movieData}) {
  return (
    <div>
      <div className="container-fluid mt-2 px-5  md-3">
      <div className="card">
        <div className="card-header bg-dark text-white">
          More About The Movie
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src={ movieData.trailer} allowFullScreen title="Movie Trailer"></iframe>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="card summary-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Summary</h5>
                    <p className="card-text">{ movieData.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
