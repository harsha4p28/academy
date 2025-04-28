import React, { useEffect, useState } from 'react';
import "./FindTutors.css";
import useAuth from "../hooks/useAuth";
import TutorResults from '../TutorResults/TutorResults';
import axios from '../api/axios';
import { ClipLoader } from 'react-spinners';

const FindTutors = () => {
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
                const response = await axios.get(`/tutors/search?query=${debouncedQuery}`, { withCredentials: true });
                setUsers(response.data);
            } catch (error) {
                setErrMsg("Error fetching tutors"+error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    },[debouncedQuery])

  return (
    <>
    <div className='findTutorsContainer'>
        <div className='findTutorsMainContainer'>
            <div className='findTutorsHeader'>
                <h3>You can search Tutors for free and connect with them</h3> 
                <p> Our goal is to connect both parties without any
                    extra cost.
                </p>
            </div>
            <div className='findTutorsSearch'>
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
            <div className='tutorResultsContainer'>
                <h3>Tutors Found</h3>
                <div className='tutorResults'>
                    {users.map((user) => (
                        <TutorResults key={user._id} user={user} />
                    ))}
                </div>
            </div>
        ) : query ? (
            <div className='noTutorsFound'>No Tutors Found</div>
        ) : (
            <div className='noTutorsFound'>Please enter a search term</div>
        )
        }
    </>
  )
}

export default FindTutors