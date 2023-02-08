import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Chat from "./pages/Chat";
import AuthContext from "./context/AuthProvider";

import './App.css';

function App() {
  const { auth, setAuth } = useContext(AuthContext);

  // useEffect(() => {
  //   axios.post("/api/authenticate", {}).then(response => {
  //     if (!response.data.error) {
  //       localStorage.setItem('user', response.data.user.user_name);
  //       localStorage.setItem('userID', response.data.user.id);
  //       setAuth(response.data.contact);

  //     } else {
  //       localStorage.removeItem('user');
  //       localStorage.removeItem('userID');
  //     }
  //   });
  // });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth ? <Chat /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
