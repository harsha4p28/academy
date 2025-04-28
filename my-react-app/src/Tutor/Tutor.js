import React from 'react';
import "./Tutor.css";
import useAuth from "../hooks/useAuth";
import { Link } from 'react-router-dom';

const Tutor = () => {
  const { auth } = useAuth();

  return (
    <div className='tutorContainer'>
      <div className='tutorMainContainer'>
        <h1>Welcome, {auth?.user?.name || 'Tutor'}!</h1>
        
        <div className="tutorSection">
          <h2>Students Looking for Tutors</h2>
          <p>📚 No students found yet. Start by updating your availability!</p>
        </div>

        <div className="tutorSection">
          <h2>Pending Requests</h2>
          <p>🕒 You have no pending student requests.</p>
        </div>

        <div className="tutorChildSection">
          <h2>Your Students</h2>
          <p> No students added yet. Start by adding your students!</p>
        </div>

        <div className="tutorActions">
          <p><Link to="/message">Open messages</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Tutor;
