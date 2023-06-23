import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import socket from '../../socket';

import {
  CommonContainer,
  CommonForm,
  CommonLink,
  CommonInput,
  CommonSubmitButton,
} from './Common';
import Marginer from '../Marginer';
import AuthContext from '../../context/AuthProvider';

import './RegisterForm.css';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function RegisterForm(props) {
  const [firstNameRegister, setFirstNameRegister] = useState('');
  const [lastNameRegister, setLastNameRegister] = useState('');
  const [usernameRegister, setUsernameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuth, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage('');
  }, [firstNameRegister, lastNameRegister, usernameRegister, emailRegister, passwordRegister, confirmPassword]);

  const register = async () => {
    try {
      const response = await axios.post('api/register', {
        firstName: firstNameRegister,
        lastName: lastNameRegister,
        username: usernameRegister,
        email: emailRegister,
        password: passwordRegister,
      });

      setAuth(response.data.authenticated);
      setLoggedInUser(response.data.loggedInUser);
      setFirstNameRegister('');
      setLastNameRegister('');
      setUsernameRegister('');
      setPasswordRegister('');
      setConfirmPassword('');
      setErrorMessage('');
      socket.connect();
      navigate('/chat');
    } catch ({ response }) {
      setErrorMessage(response.data.message);
    }
  };

  const validateConfirmPassword = () => {
    if (passwordRegister !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
    } else {
      register();
    }
  };

  return (
    <CommonContainer>
      {errorMessage && (
        <div className="register-validation">
          <RiErrorWarningLine className='register-validation-symbol' />
          <p>
            {errorMessage}
          </p>
        </div>
      )}
      <Marginer direction="vertical" margin={10} />
      <CommonForm>
        <CommonInput
          type="text"
          placeholder="First Name"
          value={firstNameRegister}
          onChange={setFirstNameRegister}
        />
        <CommonInput
          type="text"
          placeholder="Last Name"
          value={lastNameRegister}
          onChange={setLastNameRegister}
        />
        <CommonInput
          type="text"
          placeholder="Username"
          value={usernameRegister}
          onChange={setUsernameRegister}
        />
        <CommonInput
          type="email"
          placeholder="Email"
          value={emailRegister}
          onChange={setEmailRegister}
        />
        <CommonInput
          type="password"
          placeholder="Password"
          value={passwordRegister}
          onChange={setPasswordRegister}
        />
        <CommonInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </CommonForm>
      <Marginer direction="vertical" margin={10} />
      <CommonSubmitButton onClick={validateConfirmPassword}>
        Register
      </CommonSubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <div className="switch-form-link-container">
        <CommonLink muted>Already have an account? </CommonLink>
        <CommonLink bold onClick={props.switchForm}>
          Log In
        </CommonLink>
      </div>
    </CommonContainer>
  );
}
