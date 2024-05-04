// Code Written By: Tejas Chaudhari
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BasicDetails from "../components/BasicDetails";
import Crew from "../components/Crew";
import Reviews from "../components/Reviews";
import { useLocation } from "react-router-dom";
import Summary from "../components/Summary";
import RatingBar from "../components/RatingBar";
export default function Movie_Page() {
  const currentPath = useLocation().pathname.split("/")[2].replace(/%20/g, ' '); /* This is the name of the movie. */

  const [movieData, setMovieData] = React.useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/movie/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movie_name: currentPath }),
        
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Display a user-friendly error message
        alert("An error occurred while fetching the data. Please try again later.");
      }
    };
    fetchData();
  }, [currentPath]);
  return (
    <div>
      <Navbar />
      <BasicDetails movieData={movieData}/>
      <Summary movieData={ movieData} />
      <Crew movieData={ movieData} />
      <Reviews movieData={ movieData} />
      <RatingBar />
      <Footer />
    </div>
  );
}
