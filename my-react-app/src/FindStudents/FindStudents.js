import React, { useEffect, useState } from 'react';
import StudentResults from "../Components/StudentResults/StudentResults";
import "./FindStudents.css";
import axios from '../api/axios';
import { ClipLoader } from 'react-spinners';

const FindStudents = () => {
  const [query, setQuery] = useState("");
      const [debouncedQuery, setDebouncedQuery] = useState(query);
      const [loading, setLoading] = useState(false);
      const [errMsg, setErrMsg] = useState("");
      const [users, setUsers] = useState([]);
      
      useEffect(() =>{
          const timer= setTimeout(() =>{
              setDebouncedQuery(query);
  
          },1000);
          return () => clearTimeout(timer);
      },[query]);
  
      useEffect(()=>{
          if(debouncedQuery ===""){
              setUsers([]);
              return;
          }
          const fetchUsers = async () => {
              setLoading(true);
              try {
                  const response = await axios.get(`/students/search?query=${debouncedQuery}`, { withCredentials: true });
                  setUsers(response.data);
              } catch (error) {
                  setErrMsg("Error fetching tutors"+error);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchUsers();
  
      },[debouncedQuery]);

  return (
    <>
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
        <input
          type="text" 
          placeholder='Search for tutors'
          value={query}
          onChange={(e) => setQuery(e.target.value)} />
          <button>Search</button>
        </div>
      </div>
      
    </div>
    {loading ? (<div style={{textAlign: "center", marginTop: "100px"}}><ClipLoader size={80} color={"#123abc"} loading={true} className='loader'/></div>) 
      : errMsg ? ( <div>{errMsg}</div>)
      : users.length > 0 ? (
        <div className='studentsResultsContainer'>
          <h3>Students Found</h3>
          <div className='studentResults'>
              {users.map((user) => (
                  <StudentResults key={user._id} user={user} />
              ))}
          </div>
        </div>
      ) : query ? (
          <div className='noStudentsFound'>No Students Found</div>
      ) : (
          <div className='noStudentsFound'>Please enter a search term</div>
        )
      }
    </>
  )
}

export default FindStudents