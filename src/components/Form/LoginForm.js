import { useState, useEffect, useContext } from 'react';
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

import './LoginForm.css';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function LoginForm(props) {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuth, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage('');
  }, [emailLogin, passwordLogin]);

  const login = async () => {
    try {
      const response = await axios.post('api/login', {
        email: emailLogin,
        password: passwordLogin,
      });

      setAuth(response.data.authenticated);
      setLoggedInUser(response.data.loggedInUser);
      setEmailLogin('');
      setPasswordLogin('');
      setErrorMessage('');
      socket.connect();
      navigate('/chat');
    } catch ({ response }) {
      setErrorMessage(response.data.error);
    }
  };

  return (
    <CommonContainer>
      {errorMessage && (
        <div className="login-validation">
          <RiErrorWarningLine className='login-validation-symbol' />
          <p>
            {errorMessage}
          </p>
        </div>
      )}
      <Marginer direction="vertical" margin={10} />
      <CommonForm>
        <CommonInput
          name="email"
          type="email"
          placeholder="Email"
          value={emailLogin}
          onChange={setEmailLogin}
        />
        <CommonInput
          name="password"
          type="password"
          placeholder="Password"
          value={passwordLogin}
          onChange={setPasswordLogin}
        />
      </CommonForm>
      <Marginer direction="vertical" margin={10} />
      <CommonLink muted href="#">
        Forgot your password?
      </CommonLink>
      <Marginer direction="vertical" margin="1.6em" />
      <CommonSubmitButton onClick={login}>Log in</CommonSubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <div className="switch-form-link-container">
        <CommonLink muted>Don't have an account? </CommonLink>
        <CommonLink bold onClick={props.switchForm}>
          Register
        </CommonLink>
      </div>
    </CommonContainer>
  );
}
