import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const username =
    localStorage.getItem(
      "username"
    ); /* We willl set the text in the user/logIn button to the username if the username string is not empty */
  const [search, setSearch] = useState("");
  /* search is the name text contained in the searchBar. */
  const navigate =
    useNavigate(); /* Here we are using the navigate function to go to the movie page on clicking the submit button. */

  const handleSubmit = async (e) => {
    console.log(search);
    e.preventDefault(); /*This is to prevent submission on page reload and rendering*/
    try {
      const response = await fetch("http://localhost:8000/search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_query: search }),
      });
      if (response.ok) {
        const search_result = await response.json();
        console.log(
          "Search submitted successfully",
          search_result[0].name
        ); /* consle log the name of the movie with the highest similarity_ratio */
        navigate(
          `/Movie_Page/${search_result[0].name}`
        ); /*navigate to the page of the movie with the highest similarity ratio*/
      } else {
        console.log("Error: Resposne not okay!");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-sl navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Image tag on the leftmost side with reference to the home page */}
        <a className="navbar-brand" href="/home">
          <img src="logo.png" id="Logo" alt="Movie Mania" width={60} />
        </a>
        {/* Search bar in the middle */}
        <form
          className="form-inline my-2 my-lg-0 mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search movies..."
            aria-label="Search"
            value={
              search
            } /* We are setting the value of the search state variable to the content in the box */
            onChange={handleChange}
          />
          <button
            className="btn btn-outline-warning my-2 my-sm-0" /* Removing the margin of the button so that it appers in flush with other elements */
            type="submit"
          >
            Search
          </button>
        </form>
        {/* SignIn button on the right */}
        <a href="/login">
          <button className="btn btn-outline-warning ml-auto" type="button">
            {username == null || username == "" ? "Sign Up / LogIn" : username}  {/* If the submit button has been clicked once, the string will be empty otherwise it will be none. */}
          </button> 
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
