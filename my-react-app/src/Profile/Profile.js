import React, { use, useContext, useEffect, useState } from 'react';
import "./Profile.css";
import  useAuth  from "../hooks/useAuth";
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { ClipLoader } from 'react-spinners';

const Profile = () => {
  const { auth } = useAuth();
  const {setAuth} = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleProfile = async () =>{
    try {
      const response = await axios.get('/profile', { withCredentials: true });
      console.log(response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data", error);
    } finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    handleProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      setAuth(null);
      window.location.reload(); 
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  
  return (
    loading?
      (<div style={{textAlign: "center", marginTop: "100px"}}>
        <ClipLoader size={80} color={"#123abc"} loading={true} />
      </div>) : profileData? (<div className='profileMainContainer'>
        <div className='profileContainer'>
            <h1>Profile</h1>
            <div className='profileDetails'>
            <h2>Profile Details</h2>
            <p>Name:    {profileData.user.name} </p>
            <p>Email:   {profileData.user.email} </p>
            <p>Phone:   {profileData.user.phone}</p>
            <p>Address: {profileData.user.address} </p>
            <p>City:    {profileData.user.city} </p>
            <p>State:   {profileData.user.state} </p>
            </div>
            <div className='profileActions'>
              <button>Change Password</button>
            </div>
            <div className='ProfileLogout'>
              <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>) :<></>
  )
}

export default Profile