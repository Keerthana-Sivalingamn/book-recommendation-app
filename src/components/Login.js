import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with", { email, password });
      const response = await axios.post('http://localhost:5000/login', { email, password },{ headers: { 'Content-Type': 'application/json' } }
      );
      
      console.log("Response data:", response.data); // Debugging line
      const token = response.data.token;
      console.log(token);

      if (token) {
    // Store token in sessionStorage instead of localStorage
    
    sessionStorage.setItem('token', token); // Store token in sessionStorage
    console.log("Token stored in sessionStorage:", sessionStorage.getItem('token')); // Verify token storage
    setIsAuthenticated(true);
    setErrorMessage('');
    navigate('/home');
} else {
    setErrorMessage("Login failed: Token not received from server");
}
} catch (error) {
    console.error("Login error:", error); // Logs the entire error object
    if (error.response && error.response.status === 401) {
        setErrorMessage("Please enter correct password or email");
    } else if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
    } else {
        setErrorMessage("An error occurred. Please try again later.");
    }
}
  };
  return (
    <div className="login-container">
      <div className="login-image">
       <img src="https://www.malcare.com/wp-content/uploads/2020/09/WordPress-Login-Not-Secure...png" alt="Background" />
     </div>

      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="off"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="off"
          />
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
