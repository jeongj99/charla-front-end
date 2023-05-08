import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import socket from "../../socket";

import AuthContext from "../../context/AuthProvider";

import "./SidebarProfile.css";
import { BiHome, BiLogOut } from "react-icons/bi";

export default function SidebarProfile() {
  const { loggedInUser, setAuth, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout", {});
      setAuth(response.data.auth);
      setLoggedInUser(null);
      socket.disconnect();
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };

  return (
    <main className="sidebar-profile-container">
      <p className="sidebar-profile-name">
        {loggedInUser.firstName} {loggedInUser.lastName}
      </p>
      <div className="sidebar-profile-buttons">
        <button onClick={backHome}>
          <BiHome />
        </button>
        <button onClick={logout}>
          <BiLogOut />
        </button>
      </div>
    </main>
  );
}
