import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Form from "../components/Form";
import AuthContext from '../context/AuthProvider';

import "./Home.css";

export default function Home() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <Navbar />
        <section className="home-section">
          {auth ? <button onClick={() => navigate("/chat")}>Go to your chats </button> : <Form />}
        </section>
      </div>
    </>
  );
}