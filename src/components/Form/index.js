import { useState } from "react";
import { motion } from "framer-motion";

import LoginForm from "./LoginForm";

import "./index.css";
import RegisterForm from "./RegisterForm";

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)"
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)"
  }
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30
};

export default function Form() {
  const [isExpanded, setExpanded] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const playAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchForm = () => {
    playAnimation();
    setTimeout(() => {
      if (activeForm === "login") {
        setActiveForm("register");
      } else {
        setActiveForm("login");
      }
    }, 500);
  };

  return (
    <div className="form-container">
      <div className="form-top-container">
        <motion.div
          className="backdrop"
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={backdropVariants}
          transition={expandingTransition}
        />
        {activeForm === "login" && <div className="form-header-container">
          <h2 className="form-header-message">Welcome</h2>
          <h2 className="form-header-message">Back!</h2>
          <h5 className="form-header-small-message">Please log in to continue.</h5>
        </div>}
        {activeForm === "register" && <div className="form-header-container">
          <h2 className="form-header-message">Create</h2>
          <h2 className="form-header-message">Account</h2>
          <h5 className="form-header-small-message">Please register to continue</h5>
        </div>}
      </div>
      <div className="form-middle-container">
        {activeForm === "login" && <LoginForm switchForm={switchForm} />}
        {activeForm === "register" && <RegisterForm switchForm={switchForm} />}
      </div>
    </div>
  );
}