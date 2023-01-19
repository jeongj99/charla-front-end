import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";
import { IconContext } from "react-icons/lib";

export default function Navbar() {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo">
              Charla
            </Link>
            <ul>
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => "nav-links" + (isActive ? "activated" : "")} >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? "activated" : "")} >
                  Log In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? "activated" : "")} >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}