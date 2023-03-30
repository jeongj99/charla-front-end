import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function useChatData(id) {
  const [state, setState] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const fetchChatData = async (id) => {
    const conversationsResult = await axios.get("api/conversations");
    setState({ conversations: conversationsResult.data });

    if (id) {
      const messagesResult = await axios.get("api/messages", {
        params: {
          id
        }
      });
      setState(prev => ({ ...prev, messages: messagesResult.data }));
    }
  };

  // On page load, it does all those GET requests to those paths and set the states with the data obtained from those GET Requests
  useEffect(() => {
    fetchChatData(id);
  }, [id]);

  const searchForUser = useCallback(async (searchValue) => {
    const searchedUsersResult = await axios.get('api/searchuser', {
      params: {
        searchValue
      }
    });
    setState(prev => ({ ...prev, searchedUsers: searchedUsersResult.data }));
  }, []);

  useEffect(() => {
    if (searchValue.length > 0) {
      searchForUser(searchValue);
    }
  }, [searchForUser, searchValue]);

  useEffect(() => {
    if (searchValue.length === 0 && state && 'searchedUsers' in state) {
      setState(prev => {
        const { searchedUsers, ...rest } = prev;
        return rest;
      });
    }
  }, [searchValue, state]);

  const navigateToChat = convoID => {
    navigate(`/chat/${convoID}`);
  };

  const removeYourselfFromConvo = async (event, convoID) => {
    event.stopPropagation();

    const deleteData = await axios.delete('api/deleteparticipant', {
      params: {
        convoID
      }
    });

    if (deleteData.data.success) {
      navigate('/chat');
    }
  };


  return {
    state,
    searchValue,
    setSearchValue,
    searchForUser,
    navigateToChat,
    removeYourselfFromConvo
  };
}