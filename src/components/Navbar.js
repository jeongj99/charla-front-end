import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiXdadevelopers } from "react-icons/si";
import { IconContext } from "react-icons/lib";

export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(prev => !prev);

  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Charla <SiXdadevelopers className='charlaLogo'/>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => "nav-links" + (isActive ? "activated" : "")} onClick={closeMobileMenu} >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? "activated" : "")} onClick={closeMobileMenu} >
                  Log In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? "activated" : "")} onClick={closeMobileMenu} >
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