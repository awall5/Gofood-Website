import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Login.css'; // Import CSS file for custom styles

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        localStorage.setItem("authToken", json.authToken);
        navigate("/"); // Redirect to homepage
      }

    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Incorrect Password or Username.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-card card shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
            <Link to="/createuser" className="btn btn-outline-secondary w-100 mt-3">I'm a New User</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
