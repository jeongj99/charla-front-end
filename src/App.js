import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import io from 'socket.io-client';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Chat from "./pages/Chat";
import AuthContext from "./context/AuthProvider";

import './App.css';

const socket = io.connect("http://localhost:8001");

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/chat" element={auth ? <Chat /> : <Navigate to="/" />} />
        <Route path="/chat/:id" element={auth ? <Chat /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
