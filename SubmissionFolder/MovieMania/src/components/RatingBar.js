import React, { useState } from "react";
import "./RatingBar.css";
import { useNavigate } from "react-router-dom"; /* To route the user to LoginPage if the User has not signed in */

const RatingBar = () => {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      localStorage.getItem("username") == null ||
      localStorage.getItem("username") == ""
    ) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/rating/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: rating,
          username: localStorage.getItem("username"),
          movie_name: window.location.pathname
            .split("/")[2]
            .replace(/%20/g, " "), /*g stands for global */
        }),
      });
      
      if (response.ok) {
        console.log("Rating submitted successfully");
        window.location.reload();
      } else {
        console.log("Error submitting rating");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    handleRatingChange(0);
  };

  return (
    <div className="container mt-5 text-center">
      <h3 className="mb-4 text-center">Rate This Movie</h3>
      <div className="rating-bar text-center">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index + 1 <= rating ? "star active" : "star"}
            onClick={() => handleRatingChange(index + 1)}
          >
            ★
          </span>
        ))}
      </div>
      <button
        className="btn btn-dark mt-3 text-center"
        id="rating_button"
        onClick={handleSubmit}
      >
        Submit Rating
      </button>
    </div>
  );
};

export default RatingBar;
