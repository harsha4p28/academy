import React, { useState, useEffect, useRef } from "react";
import Children from "../Components/Children/Children";
import "./Parent.css";

const Parent = () => {
  return (
    <div className="parent-container">
      <div className="parent-textcard">
        <h1>Welcome back, Parent!</h1>
        <p>You can add your child here.</p>
        <p>We don't charge any fees from parents.</p>
        <p>Simply accept requests from tutor to connect! </p>
        <div className="tutor-request">
          <button> 5 Tutor Requests</button>
        </div>
      </div>  
      <Children />
      <div className="addChild">
        <button>Add Child</button>
      </div>
    </div>
  );
};

export default Parent;