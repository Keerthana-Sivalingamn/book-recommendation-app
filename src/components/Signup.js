// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');  // Add state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Include username in the request body
      await axios.post('http://localhost:5000/signup', { username, email, password });
      alert('Signup successful, please log in.');
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input 
            type="text"  // Use text input for username
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            required 
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <button type="submit">Signup</button>
        </form>
        <p className="login-link">
          Already have an account?{' '}
          <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
