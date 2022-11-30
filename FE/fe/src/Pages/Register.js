// Registration page for the app
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import './Register.css';

// export default function Register() {
//     return (
//       <h1> Register</h1>

//   );
// }
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mailingAddress: '',
        billingAddress: '',
        prefPayment: '',        
        password: '',
        password2: '',
    });
    
    const { name, email ,mailingAddress, billingAddress, prefPayment, password, password2 } = formData;
    
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
        console.log('Passwords do not match');
        } else {
        const newUser = {
            name,
            email,
            mailingAddress,
            billingAddress,
            prefPayment,
            password,
        };
        }
    };

    return (
        <div className="register">
            <div className="register-container">
                <div className="register-title">Register</div>
                <form className="register-form" onSubmit={(e) => onSubmit(e)}>
                    <div className="register-form-group">
                        <label className="register-form-label">Name</label>
                        <input
                            className="register-form-input"
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label className="register-form-label">E-mail</label>
                        <input
                            className="register-form-input"
                            type="text"
                            placeholder="E-mail"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label className="register-form-label">Mailing Address</label>
                        <input

                            className="register-form-input"
                            type="mailingAddress"
                            placeholder="1234 Main St"
                            name="mailingAddress"
                            value={mailingAddress}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label className="register-form-label">Billing Address</label>
                        <input
                            className="register-form-input"
                            type="billingAddress"
                            placeholder="1234 Main St"
                            name="billingAddress"
                            value={billingAddress}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label className="register-form-label">
                            Preferred Payment Method
                        </label>
                        <select className="register-form-input" name="country" onChange={(e) => onChange(e)} required>
                            <option value="australia">CC</option>
                            <option value="canada">Cash</option>
                            <option value="usa">Check</option>
                        </select>
                        {/* <input
                            className="register-form-input"
                            type="prefPayment"
                            placeholder="Preferred Payment Method"
                            name="prefPayment"
                            value={prefPayment}
                            onChange={(e) => onChange(e)}
                            required
                        /> */}
                    </div>
                    <div className="register-form-group">
                        <label className="register-form-label">Password</label>
                        <input
                            className="register-form-input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="register-form-group">
                        <label className="register-form-label">Confirm Password</label>
                        <input
                            className="register-form-input"
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={(e) => onChange(e)}
                            required
                            minLength="6"
                        />
                    </div>
                    <input
                        type="submit"
                        className="register-form-button"
                        value="Register"
                    />
                </form>
                <p className="register-text">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
