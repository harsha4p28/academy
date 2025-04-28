import React from "react";
import tutor from "../Assets/tutor.jpg";
import userIcon from "../Assets/user-icon.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <div className="MainContainer">
      <div className="logo">
        <Link to="/">
          <img src={tutor} alt="logo" />
        </Link>
        <h1>Tutors Academy</h1>
      </div>
      {!auth?.email ? (
        <>  
        <div className="components">
            <h2><Link to="/tutor"> Become a tutor</Link></h2>
            <h2><Link to="/parent">Find a tutor</Link></h2>
            <h2>Our policy</h2>
        </div>
        <div className="user">
          <img src={userIcon} alt="user-icon" />
          <Link to="/login"><h2>Login</h2></Link>
        </div>
        </>
        ): auth?.role === "Tutor" ? (
        <div className="components">
            <h2><Link to="/"> Dashboard</Link></h2>
            <h2><Link to="/findstudents">Find students</Link></h2>
            <h2><Link to="/message">Messages</Link></h2>
            <h2><Link to="/profile">Profile</Link></h2>
        </div>) : (
        <div className="components">
            <h2><Link to="/"> Dashboard</Link></h2>
            <h2><Link to='/findtutors'>Find tutors</Link></h2>
            <h2><Link to="/message">Messages</Link></h2>
            <h2><Link to="/profile">Profile</Link></h2>
        </div>
            )
          }
    </div>
  );
};

export default Navbar;
