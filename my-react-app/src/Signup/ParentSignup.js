import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:5000/register-parent'; // Full backend URL

const ParentSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    password: '',
    confirmPassword: ''
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, address, city, state, postalCode, password, confirmPassword } = formData;

    if (!USER_REGEX.test(name) || !PWD_REGEX.test(password)) {
      setErrMsg("Invalid Name or Password");
      return;
    }
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, phone, address, city, state, postalCode, password }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response?.data);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setErrMsg(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <section>
      <form className="signUp-form" onSubmit={handleSubmit}>
        <h3>Sign up today to start connecting with tutors!</h3>

        <input 
          type="text" name="name" placeholder="Parent Name" 
          value={formData.name} onChange={handleChange} required 
        />
        <input 
          type="email" name="email" placeholder="Parent Email" 
          value={formData.email} onChange={handleChange} required 
        />
        <input 
          type="number" name="phone" placeholder="Parent Phone Number" 
          value={formData.phone} onChange={handleChange} required 
        />
        <input 
          type="text" name="address" placeholder="Parent Address" 
          value={formData.address} onChange={handleChange} required 
        />
        <input 
          type="text" name="city" placeholder="Parent City" 
          value={formData.city} onChange={handleChange} required 
        />
        <input 
          type="text" name="state" placeholder="Parent State" 
          value={formData.state} onChange={handleChange} required 
        />
        <input 
          type="number" name="postalCode" placeholder="Parent Postal Code" 
          value={formData.postalCode} onChange={handleChange} required 
        />
        <input 
          type="password" name="password" placeholder="Parent Password" 
          value={formData.password} onChange={handleChange} required 
        />
        <input 
          type="password" name="confirmPassword" placeholder="Confirm Parent Password" 
          value={formData.confirmPassword} onChange={handleChange} required 
        />

        {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        {success && <p style={{ color: 'green' }}>Registration Successful!<br /><Link to="/login">Login here</Link></p>}

        <button 
          type="submit" 
          disabled={formData.password !== formData.confirmPassword}
        >
          Sign Up
        </button>

        <p>
          Already registered? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </section>
  );
};

export default ParentSignup;
