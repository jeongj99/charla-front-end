import { useState, useEffect, useContext } from 'react';
import axios from "../../api/axios";

import AuthContext from '../../context/AuthProvider';

import "./SidebarProfile.css";
import { BiLogOut } from "react-icons/bi";

export default function SidebarProfile() {
  const { setAuth } = useContext(AuthContext);
  const [loggedInName, setLoggedInName] = useState(null);

  useEffect(() => {
    axios.get("api/loggedin")
      .then(response => {
        setLoggedInName(`${response.data.loggedInUser.firstName} ${response.data.loggedInUser.lastName}`);
      })
      .catch(error => {
        console.log('Hello', error);
      });
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout", {});
      setAuth(response.data.auth);
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };

  return (
    <main className="sidebar-profile-container">
      <p className="sidebar-profile-name">{loggedInName}</p>
      <button className='logout-button' onClick={logout}>
        <BiLogOut />
      </button>
    </main>
  );
}
