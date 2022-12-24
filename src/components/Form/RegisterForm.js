import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

import { CommonContainer, CommonForm, CommonLink, CommonInput, CommonSubmitButton } from "./Common";
import Marginer from "../Marginer";
import AuthContext from "../../context/AuthProvider";

export default function RegisterForm(props) {
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const register = async () => {
    const response = await axios.post('api/register', {
      firstName: firstNameRegister,
      lastName: lastNameRegister,
      username: usernameRegister,
      email: emailRegister,
      password: passwordRegister
    });

    if (response.data.error) {
      setErrorMessage(response.data.message);
    } else {
      setAuth(response.data.authenticated);
      setFirstNameRegister("");
      setLastNameRegister("");
      setUsernameRegister("");
      setPasswordRegister("");
      setConfirmPassword("");
      setErrorMessage("");
      navigate("/chat");
    }
  };

  return (
    <CommonContainer>
      <CommonForm>
        <CommonInput type="text" placeholder="First Name" value={firstNameRegister} onChange={setFirstNameRegister} />
        <CommonInput type="text" placeholder="Last Name" value={lastNameRegister} onChange={setLastNameRegister} />
        <CommonInput type="text" placeholder="Username" value={usernameRegister} onChange={setUsernameRegister} />
        <CommonInput type="email" placeholder="Email" value={emailRegister} onChange={setEmailRegister} />
        <CommonInput type="password" placeholder="Password" value={passwordRegister} onChange={setPasswordRegister} />
        <CommonInput type="password" placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
      </CommonForm>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <CommonSubmitButton onClick={register}>Register</CommonSubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <CommonLink muted>Already have an account? <CommonLink bold onClick={props.switchForm}>Log In</CommonLink></CommonLink>
    </CommonContainer>
  );
}