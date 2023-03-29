import { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";

export default function useChatData(id) {
  const [state, setState] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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

  const navigateToChat = () => {
    
  };


  return {
    state,
    searchValue,
    setSearchValue,
    searchForUser
  };
}