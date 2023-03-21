import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function useChatData() {
  const [state, setState] = useState({
    conversations: [],
    messeges: []
  });

  const fetchChatData = async () => {
    const conversationsResult = await axios.get("api/datatest");
    setState(prev => ({ ...prev, conversations: conversationsResult.data }));
  };

  // On page load, it does all those GET requests to those paths and set the states with the data obtained from those GET Requests
  useEffect(() => {
    fetchChatData();
  }, []);

  return {
    state
  };
}