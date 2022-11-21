// // Registration page for the app
// import React, { useState } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import './Register.css';

export default function Register() {
    return (
      <h1> Register</h1>

  );
}
// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         password2: '',
//     });
    
//     const { name, email, password, password2 } = formData;
    
//     const onChange = (e) =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });
    
//     const onSubmit = async (e) => {
//         e.preventDefault();
//         if (password !== password2) {
//         console.log('Passwords do not match');
//         } else {
//         const newUser = {
//             name,
//             email,
//             password,
//         };
    
//         try {
//             const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             };
    
//             const body = JSON.stringify(newUser);
    
//             const res = await axios.post('/api/users', body, config);
//             console.log(res.data);
//         } catch (err) {
//             console.error(err.response.data);
//         }
//         }
//     };

//     return (
//         <div className="register">
//             <div className="register-container">
//                 <div className="register-title">Register</div>
//                 <form className="register-form" onSubmit={(e) => onSubmit(e)}>
//                     <div className="register-form-group">
//                         <label className="register-form-label">Name</label>
//                         <input
//                             className="register-form-input"
//                             type="text"
//                             placeholder="Name"
//                             name="name"
//                             value={name}
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>
//                     <div className="register-form-group">
//                         <label className="register-form-label">Email</label>
//                         <input

//                             className="register-form-input"
//                             type="email"
//                             placeholder="Email Address"
//                             name="email"
//                             value={email}
//                             onChange={(e) => onChange(e)}
//                             required
//                         />
//                     </div>
//                     <div className="register-form-group">
//                         <label className="register-form-label">Password</label>
//                         <input
//                             className="register-form-input"
//                             type="password"
//                             placeholder="Password"
//                             name="password"
//                             value={password}
//                             onChange={(e) => onChange(e)}
//                             required
//                             minLength="6"
//                         />
//                     </div>
//                     <div className="register-form-group">
//                         <label className="register-form-label">
//                             Confirm Password
//                         </label>
//                         <input
//                             className="register-form-input"
//                             type="password"
//                             placeholder="Confirm Password"
//                             name="password2"
//                             value={password2}
//                             onChange={(e) => onChange(e)}
//                             required
//                             minLength="6"
//                         />
//                     </div>
//                     <input
//                         type="submit"
//                         className="register-form-button"
//                         value="Register"
//                     />
//                 </form>
//                 <p className="register-text">
//                     Already have an account? <Link to="/login">Sign In</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Register;
