// login page that connects to the backend
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const { email, password } = formData;
    
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('SUCCESS');
        const newUser = {
        email,
        password,
        };
    
        try {
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };
    
        const body = JSON.stringify(newUser);
    
        // const res = await axios.post('/api/users', body, config);
        // console.log(res.data);
        } catch (err) {
        console.error(err.response.data);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-title">Login</div>
                <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                    <div className="login-form-group">
                        <label className="login-form-label">Email</label>
                        <input
                            className="login-form-input"
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <label className="login-form-label">Password</label>
                        <input
                            className="login-form-input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                        />
                    </div>
                    <input type="submit" className="login-form-button" value="Login" />
                </form>
                <p className="login-Login">
                    Don't have an account? <Link to="/Register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
