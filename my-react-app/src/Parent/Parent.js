import React, { useState, useEffect, useRef } from "react";
import Children from "../Components/Children/Children";
import "./Parent.css";
import axios from "../api/axios";
import Child from "../Child/Child";

const Parent = () => {
  const [msg, setMsg]= useState("");
  const [child, setChild] = useState([]);
  const [childForm, setChildForm] = useState(false);

  const getChild = async () => {
    try{
      const response=await axios.get("/parent", 
        {withCredentials:true }
      )
      const childrenArray = Array.isArray(response.data) 
      ? response.data 
      : response.data.children || [];  

    setChild(childrenArray);
    }catch(e){
      setMsg("Error"+ e);
    }
  };
 
  
  

  useEffect(()=>{
    getChild();
  },[])

  return (
    <div className="parent-container">
      <div className="parent-textcard">
        <h1>Welcome back, Parent!</h1>
        <p>You can add your child here.</p>
        <p>We don't charge any fees from parents.</p>
        <p>Simply accept requests from tutor to connect! </p>
        {/* <div className="tutor-request">
          <button> 0 Tutor Requests</button>
        </div> */}
      </div>  
      {Array.isArray(child) && <Children childrenData={child} />}
      <div className="addChild">
        <button onClick={()=> setChildForm(true)} >Add Child</button>
      </div>
      <div className="childForm">
        {childForm && <Child setChildForm={setChildForm}/>}
      </div>
      
    </div>
  );
};

export default Parent;