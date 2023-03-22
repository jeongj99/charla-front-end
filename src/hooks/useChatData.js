import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function useChatData(id) {
  const [state, setState] = useState({
    conversations: [],
    messages: []
  });

  const fetchChatData = async (id) => {
    const conversationsResult = await axios.get("api/conversations");
    setState(prev => ({ ...prev, conversations: conversationsResult.data }));

    if (id) {
      const messagesResult = await axios.get("api/messages", {
        params: {
          id
        }
      });
      console.log(messagesResult);
      setState(prev => ({ ...prev, messages: messagesResult.data }));
    }
  };

  // On page load, it does all those GET requests to those paths and set the states with the data obtained from those GET Requests
  useEffect(() => {
    fetchChatData(id);
  }, [id]);

  return {
    state
  };
}