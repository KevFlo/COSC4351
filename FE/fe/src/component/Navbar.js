import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        KYBALION
      </Link>
      <ul>
        <CustomLink to="login">Login</CustomLink>
        <CustomLink to="register">Register</CustomLink>
        <CustomLink to="reservation">Reservation</CustomLink>
      </ul>
    </nav>
  );
}



function CustomLink({ to, children, ...props}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
  return (
    <li className={ isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

































// import React from 'react';
// import './Navbar.css';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className='navbar bg-dark'>
//       <ul>
//         <li><Link to='/'>Home</Link></li>
//         <li><Link to='Login'>About</Link></li>
//         <li><Link to='Register'>Register</Link></li>
//         <li><Link to='Reservation'>Login</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


// creating a navbar
// import React from 'react';
// import './Navbar.css';
// // import { Link } from 'react-router-dom';

// function butClick(){
//     alert('You clicked a button!')
//   }

// const Navbar = () => {
//   return (
//     <nav className='navbar bg-dark'>
//       <ul>
//         <li><button className="nav-button" onClick={butClick}>Reservation</button></li>
//         <li><button className="nav-button" onClick={butClick}>Register</button></li>
//         <li><button className="nav-button" onClick={butClick}>Login</button></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


// navbar that links to other pages with react-router-dom
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className='navbar bg-dark'>
//       <ul>
//         <li>
//           <Link to='/'>Home</Link>
//         </li>
//         <li>
//           <Link to='/about'>About</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
