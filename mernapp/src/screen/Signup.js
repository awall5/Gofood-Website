import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Signup.css'; // Import custom CSS for styling

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            }),
        });

        const json = await response.json();
        if (json.success) {
            alert("User created successfully");
        } else {
            alert("Enter valid credentials");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="signup-container">
            <div className="signup-card card shadow-lg">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Create an Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={credentials.name}
                                onChange={onChange}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={credentials.email}
                                onChange={onChange}
                                placeholder="Enter your email"
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
                                placeholder="Enter a strong password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="geolocation"
                                value={credentials.geolocation}
                                onChange={onChange}
                                placeholder="Enter your address"
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100 mt-3">Sign Up</button>
                        <Link to="/login" className="btn btn-outline-secondary w-100 mt-3">Already a user? Log in</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
