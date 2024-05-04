import React, { useEffect } from "react";
import { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  }); /* userInfo is an array */
  const navigate =
    useNavigate(); /* The useNaviage hook is the newer version of the useHistory hook, useful to go to a specific URL or forward or backward pages. */
  const handleSubmit = async (e) => {
    /* e stands for event; async fuction is a asynchronous function, allowing the code to run in parallel when it performs tasks. */
    e.preventDefault(); /*This disallows the form from submitting unless user clicks Submit button i.e. when the page renders or when you reload the page and so on...*/
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        } /* indicates that the content being sent in the body of the request is JSON data */,
        body: JSON.stringify(
          userInfo
        ) /* JSON.stringigy converts a JS object to a JSON object */,
      });
      if (!response.ok) {
        /* this conditional will be true when we are sending response 409 */
        alert(
          "Invalid username or password or username already taken. Please try again."
        );
        localStorage.setItem(
          "username",
          ""
        ); /* We are storing the username in the local storage. If we get an invalid response, then the username will be set to an empty string. */
      } else {
        localStorage.setItem("username", userInfo.username);
        navigate(
          "/home"
        ); /* Navigate to the home page on successful submission. */
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setUserInfo({
      ...userInfo /* Spread opertators, unpacks the elements in userInfo */,
      ["username"]: value,
    });
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUserInfo({
      ...userInfo,
      ["password"]: value,
    });
  };

  return (
    <div className="container mt-5">
      <a href="/home">
        <img
          src="logo.png"
          alt="Movie Mania"
          className="d-block mx-auto mb-4"
        />
      </a>
      <h2 className="text-center mb-4">User Login Cum Registration</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={userInfo.username}
                onChange={handleNameChange}
              />
              <div className="invalid-feedback">
                Username must contain only alphanumeric characters and
                underscores.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
                value={userInfo.password}
                onChange={handlePasswordChange}
              />
            </div>
            <a href="/home">
              <button type="submit" className="btn btn-warning btn-block">
                Login
              </button>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
