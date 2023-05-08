import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8001", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
