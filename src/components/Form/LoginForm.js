import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

import { CommonContainer, CommonForm, CommonLink, CommonInput, CommonSubmitButton } from "./Common";
import Marginer from "../Marginer";
import AuthContext from "../../context/AuthProvider";

import { RiErrorWarningLine } from "react-icons/ri";

export default function LoginForm(props) {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
  }, [emailLogin, passwordLogin]);

  const login = async () => {
    try {
      const response = await axios.post('api/login', {
        email: emailLogin,
        password: passwordLogin
      });

      setAuth(response.data.authenticated);
      setEmailLogin("");
      setPasswordLogin("");
      setErrorMessage("");
      navigate("/chat");
    } catch ({ response }) {
      console.log(response.data.error);
      setErrorMessage(response.data.error);
    }
  };

  return (
    <CommonContainer>
      <CommonForm>
        <CommonInput name="email" type="email" placeholder="Email" value={emailLogin} onChange={setEmailLogin} />
        <CommonInput name="password" type="password" placeholder="Password" value={passwordLogin} onChange={setPasswordLogin} />
      </CommonForm>
      <Marginer direction="vertical" margin={10} />
      <CommonLink muted href="#">Forgot your password?</CommonLink>
      <Marginer direction="vertical" margin="1.6em" />
      <CommonSubmitButton onClick={login}>Log in</CommonSubmitButton>
      <Marginer direction="vertical" margin="1em" />
      {
        errorMessage &&
        <div className="login-validation">
          <p>
            <RiErrorWarningLine />{errorMessage}
          </p>
        </div>
      }
      <CommonLink muted>Don't have an account? <CommonLink bold onClick={props.switchForm}>Register</CommonLink></CommonLink>
    </CommonContainer>
  );
};