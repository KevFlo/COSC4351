// Registration page for the app
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';


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

    const [ccData, setCCData] = useState({
        number: '',
        nameOnCC: '',
        expiry: '',
        cvc: '',
    });

    const { name, email, mailingAddress, billingAddress, prefPayment, password, password2 } = formData;

    const {ccNumber, nameOnCC, expiry, cvc} = ccData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const ccChange = (e) =>
        setCCData({ ...ccData, [e.target.name]: e.target.value });

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
            if (prefPayment === 'CC'){
                const newCard = {
                email,
                ccNumber,
                nameOnCC,
                expiry,
                cvc,
                };
            }
        }

        // For testing
        await fetch(`/register/${name}/${email}/${password}/${password2}/${mailingAddress}/${billingAddress}/${prefPayment}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.error != null) {
                console.log('Error');
            } else {
                console.log('Success!');
                
                if (prefPayment === 'CC') {
                    const rfExpiry = expiry.replace('/', '-');
                    console.log(`/register/${email}/${ccNumber}/${nameOnCC}/${rfExpiry}/${cvc}`)
                    fetch(`/register/${email}/${ccNumber}/${nameOnCC}/${rfExpiry}/${cvc}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                console.log(res);
                if ( res[0] === 'token') {
                    <redirect to="/Login" /> 
                }
            }
        })
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => err);
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
                        <select
                            className="register-form-input"
                            type='prefPayment'
                            placeholder="Preferred Payment Method"
                            name="prefPayment"
                            value={prefPayment}
                            onChange={(e) => onChange(e)}
                            required>
                            <option selected value=""> </option>
                            <option value="CC">CC</option>
                            <option value="Cash">Cash</option>
                            <option value="Check">Check</option>
                        </select>
                        {/* TODO: make this part render nicely inside the form */}
                    </div>
                    {prefPayment === 'CC' && <div className="register-form-group">
                            <label className="register-form-label">CC Number</label>
                            <input
                                className="register-form-input"
                                type="text"
                                placeholder="1234 1234 1234 1234"
                                name="ccNumber"
                                value={ccNumber}
                                onChange={(e) => ccChange(e)}
                            />
                        </div>
                        }
                        {prefPayment === 'CC' && <div className="register-form-group">
                            <label className="register-form-label">Name on Card</label>
                            <input
                                className="register-form-input"
                                type="text"
                                placeholder="Name"
                                name="nameOnCC"
                                value={nameOnCC}
                                onChange={(e) => ccChange(e)}
                            />
                        </div>
                        }
                        {prefPayment === 'CC' && <div className="register-form-group">
                            <label className="register-form-label">Expiration Date</label>
                            <input
                                className="register-form-input"
                                type="text"
                                placeholder="12/34"
                                name="expiry"
                                value={expiry}
                                onChange={(e) => ccChange(e)}
                                maxLength = "5"
                            />
                        </div>
                        }
                        {prefPayment === 'CC' && <div className="register-form-group">
                            <label className="register-form-label">CVC</label>
                            <input
                                className="register-form-input"
                                type="text"
                                placeholder="123"
                                name="cvc"
                                value={cvc}
                                onChange={(e) => ccChange(e)}
                                maxLength="3"
                            />
                        </div>
                        }
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
