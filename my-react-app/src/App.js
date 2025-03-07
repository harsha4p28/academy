import './App.css';
import React from 'react';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Tutor from './Tutor/Tutor';
import Parent from './Parent/Parent';
import Login from './Login/Login';

export default function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/login" element={<Login />} />  
        </Routes>
    </div>
  )
}
