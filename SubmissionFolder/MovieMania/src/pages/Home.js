// Code Written By: Tejas Chaudhari
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";
import { useState } from "react";

function Home() {
  const [username, setUsername] = useState("");
  const [top6, setTop6] = useState([
    { name: "", poster: "" },
    { name: "", poster: "" },
    { name: "", poster: "" },
    { name: "", poster: "" },
    { name: "", poster: "" },
    { name: "", poster: "" },
  ]);

  useEffect(() => {
    /* Everything that is insider this function is treated as a side-effect. */
    if (
      localStorage.getItem("username") == "" ||
      localStorage.getItem("username") == null
    ) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/home/"
          ); /* Sent a get request when the username was either null or "" */
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          const data = await response.json();
          setTop6(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Display a user-friendly error message
          alert(
            "An error occurred while fetching the data. Please try again later."
          );
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/home/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: localStorage.getItem("username"),
            }),
          });

          if (!response.ok) {
            throw new Error(
              `HTTP error ${response.status}`
            ); /* $ is the js version of f-strings in python */
          }

          const data = await response.json();
          setTop6(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Display a user-friendly error message
          alert(
            "An error occurred while fetching the data. Please try again later."
          );
        }
      };
      fetchData();
    }
  }, []); /*No dependency to the useEffect hook */
  return (
    <>
      <Navbar username={username} />
      <Welcome />
      <Recommendations top6={top6} /> {/* we are passing top6 as props*/}
      <div>
        <br></br>
      </div>
      <Footer />
    </>
  );
}

export default Home;
