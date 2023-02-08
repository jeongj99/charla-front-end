import { useContext } from "react";
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth ? <Chat /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={auth ? <Chat /> : <Home />} />
        <Route path="/chat/:id" element={auth ? <Chat /> : <Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
