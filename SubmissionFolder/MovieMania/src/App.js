/* We will do routing on this page */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movie_Page from "./pages/Movie_Page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie_page/:id" element={<Movie_Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
