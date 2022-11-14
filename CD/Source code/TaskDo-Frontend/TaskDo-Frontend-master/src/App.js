import "./App.css";
import Hero from "./components/Hero";
import { Routes, Route, Link, Router } from "react-router-dom";
import Login from "../src/components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import HeadHome from "./components/HeadHome";
import ProfHome from "./components/ProfHome";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* {!localStorage.getItem("AccessToken") && (
          <Route path="/" element={<Login />} />
        )} */}
        {!localStorage.getItem("AccessToken") && (
          <Route path="/" element={<Hero />} />
        )}
        <Route path="/login" element={<Login />} />
        {localStorage.getItem("userType") == "Hod" && (
          <Route path="/" element={<HeadHome />} />
        )}
        <Route path="hod" element={<HeadHome />} />
        <Route path="prof" element={<ProfHome />} />
        {localStorage.getItem("userType") == "Prof" && (
          <Route path="/" element={<ProfHome />} />
        )}{" "}
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
