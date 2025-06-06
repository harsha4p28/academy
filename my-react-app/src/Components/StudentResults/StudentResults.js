import React from 'react';
import './StudentResults.css';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const StudentResults = ({user}) => {
  const navigate = useNavigate();
  const handleStartConv =async (e) => {
      e.preventDefault();
  
      console.log("Starting conversation with tutor:", user.name);
      try{
        const response = await axios.post("/student/start", 
          JSON.stringify({ receiverId: user._id,senderType: "User2", receiverType: "User" }),
          { headers: { 'Content-Type': 'application/json' },
          withCredentials:true },
        );
        console.log(response?.data);
        navigate("/message");
        window.location.reload();
      }catch (err) {  
        if (!err?.response) {
          console.log('No Server Response');
        }else {
            console.log('Failed to start conversation'+err)
        }
      }
    }

  return (
    <div className='StudentResults'>
      <div className='StudentCard'>
        <div className='StudentDetails'>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>Postal Code:</strong> {user.postalCode}</p>
          <p><strong>Class:</strong> {user.class}</p>
          <p><strong>Syllabus:</strong> {user.syllabus}</p>
          <p><strong>Subject:</strong> {user.subject}</p>
          <p><strong>Preferred:</strong> {user.preferedTutor}</p>
          <p><strong>Preferred Time:</strong> {user.preferedTime}</p>
          <button onClick={handleStartConv}>Message</button>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
