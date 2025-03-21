import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import axios from "../api/axios"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!email || !password){
      setErrMsg("Enter both email and password");
      return;
    }

    try{
      const response = await axios.post(
        "/login",
        JSON.stringify({email,password}),
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response?.data);
      setSuccess(true);
    } catch(e) {
      setErrMsg("Login Failed" + e);
    }


  };

  return (
    <div className='loginContainer'>
      <div className='loginDetails'>
        <div>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className='login_email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='inputs'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className='login_password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
          {success && <p style={{ color: 'green' }}>Login Successful!<br /></p>}
          
          <button type="submit" className='login-button'>Login</button>
        </form>
        <div >New user?<Link to='/' style={{ color: '#248bd6' }}>Register here</Link></div>
      </div>
    </div>
  );
};

export default Login;