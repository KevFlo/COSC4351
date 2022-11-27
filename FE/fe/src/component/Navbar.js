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
