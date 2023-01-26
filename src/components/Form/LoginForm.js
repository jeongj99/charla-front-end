import { useState } from "react";
import axios from "axios";

import { CommonContainer, CommonForm, CommonLink, CommonInput, CommonSubmitButton } from "./Common";
import Marginer from "../Marginer";

export default function LoginForm(props) {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const login = () => {
    axios.post('api/login', {
      email: emailLogin,
      password: passwordLogin
    });
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
      <CommonLink muted>Don't have an account? <CommonLink bold onClick={props.switchForm}>Register</CommonLink></CommonLink>
    </CommonContainer>
  );
}