import React from "react";
import "./Tutor.css";
import StudentResults from "../Components/StudentResults/StudentResults";

const Tutor = () => {
  return (
    <div className="tutor-container">
      <div className="search-container">
        <div className="tutor-textcard">
          <h1>Welcome back Tutor</h1>
          <h3>You can search students for free based on your location</h3>
          <p>
            We don't charge any fees. We simply act as a middleman between
            parents and tutors.< br /> Our goal is to connect both parties without any
            extra cost.
          </p>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search for students" />
          <button>Search</button>
        </div>
      </div>
      <StudentResults />
    </div>
  );
};

export default Tutor;
