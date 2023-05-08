import { useContext, useEffect } from 'react';
import AuthContext from './context/AuthProvider';
import socket from './socket';

const useSocketSetup = () => {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      setAuth(false);
    });
    return () => {
      socket.off('connect_error');
    };
  }, [setAuth]);
};

export default useSocketSetup;
