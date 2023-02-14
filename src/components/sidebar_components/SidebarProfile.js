import { useState, useEffect, useContext } from 'react';
import axios from "../../api/axios";

import AuthContext from '../../context/AuthProvider';

import "./SidebarProfile.css";
import { BiLogOut } from "react-icons/bi";

export default function SidebarProfile() {
  const { setAuth } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    axios.get("api/loggedin")
      .then(response => {
        console.log(response.data.loggedInUser);
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
    <main>
      <button className='logout-button' onClick={logout}>
        <BiLogOut />
      </button>
    </main>
  );
}
