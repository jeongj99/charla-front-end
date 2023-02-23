import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import AuthContext from "../context/AuthProvider";

import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiXdadevelopers } from "react-icons/si";
import { IconContext } from "react-icons/lib";

export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(prev => !prev);

  const closeMobileMenu = () => setClick(false);

  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout", {});
      setAuth(response.data.auth);
      navigate("/");
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Charla <SiXdadevelopers className='charlaLogo' />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu} >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact-us" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu} >
                  Contact Us
                </NavLink>
              </li>
              {
                !auth &&
                <li className="nav-item">
                  <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu} >
                    Log In
                  </NavLink>
                </li>
              }
              {
                !auth &&
                <li className="nav-item">
                  <NavLink to="/register" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu} >
                    Register
                  </NavLink>
                </li>
              }
              {
                auth &&
                <li className="nav-item">
                  <div className="nav-links logout" onClick={logout}>
                    Log Out
                  </div>
                </li>
              }
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}