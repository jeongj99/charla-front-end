import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const authenticate = async () => {
    try {
      const response = await axios.post('api/authenticate', {});
      setAuth(response.data.authenticated);
    } catch (error) {
      console.log(error);
      setAuth(false);
    }
    setIsReady(true);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {isReady && children}
    </AuthContext.Provider >
  );
};

export default AuthContext;