import React from "react";
import tutor from "../Assets/tutor.jpg";
import userIcon from "../Assets/user-icon.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <div className="logo">
        <Link to="/">
          <img src={tutor} alt="logo" />
        </Link>
        <h1>Tutors Academy</h1>
      </div>
      <div className="components">
        <Link to="/tutor">
          <h2> Become a tutor</h2>
        </Link>
        <Link to="/parent">
          <h2>Find a tutor</h2>
        </Link>
        <h2>Our policy</h2>
      </div>
      <div className="user">
        <img src={userIcon} alt="user-icon" />
        <Link to="/login"><h2>Login</h2></Link>
      </div>
    </div>
  );
};

export default Navbar;
