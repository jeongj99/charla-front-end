import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import Navbar from "../components/Navbar";
import Form from "../components/Form";
import AuthContext from '../context/AuthProvider';

import "./Home.css";

export default function Home() {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const homeSectionClass = classNames("home-section", {
    "logged-in": auth,
  });

  return (
    <>
      <div className="home-container">
        <Navbar />
        <section className={homeSectionClass}>
          <div className="home-section-left">
            <h1>Charla</h1>
            <p>Experience the power of online conversation with Charla</p>
          </div>
          <div className="home-section-right">
            {auth ? <button onClick={() => navigate("/chat")}>Go to your chats </button> : <Form />}
          </div>
        </section>
      </div >
    </>
  );
}