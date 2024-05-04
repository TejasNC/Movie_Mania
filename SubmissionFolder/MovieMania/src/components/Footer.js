import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <>
    {/* Make the footer stick to the bottom of the page */}
    <div className="wrapper d-flex flex-column min-vh-100">
      <footer className="footer mt-auto py-3  bg-dark text-white " id="myFoot">
        <div className="container text-center">
          <span className="text-muted">
            © 2024 Movie Mania. No rights reserved.
          </span>
        </div>
      </footer>
      </div>
    </>
  );
}
