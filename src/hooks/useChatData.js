import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import socket from "../socket";

export default function useChatData(id) {
  const [state, setState] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
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

    socket.emit("update_participant_status", {
      convoID,
      amIPresent: false
    }, ({ error, done, data }) => {
      if (done) {
        setState(prevState => ({
          ...prevState,
          conversations: prevState.conversations.map(convo => {
            if (convo.conversation_id === convoID) {
              return {
                ...convo,
                amIPresent: data.participating
              };
            }
            return convo;
          })
        }));
        navigate('/chat');
        return;
      }
      console.log(error);
    });
  };

  const searchListItemOnClick = async (contactID, contactFirstName, contactLastName) => {
    const conversationExists = state.conversations.find(conversation => conversation.otherParticipant.id === contactID);
    if (conversationExists && conversationExists.amIPresent) {
      navigate(`/chat/${conversationExists.conversation_id}`);
      setSearchValue("");
      return;
    } else if (conversationExists && !conversationExists.amIPresent) {
      socket.emit("update_participant_status", {
        convoID: conversationExists.conversation_id,
        amIPresent: true
      }, ({ error, done, data }) => {
        if (done) {
          setState(prevState => ({
            ...prevState,
            conversations: prevState.conversations.map(convo => {
              if (convo.conversation_id === conversationExists.conversation_id) {
                return {
                  ...convo,
                  amIPresent: data.participating
                };
              }
              return convo;
            })
          }));
          navigate(`/chat/${conversationExists.conversation_id}`);
          setSearchValue("");
          return;
        }
        console.log(error);
      });
    }

    if (!conversationExists) {
      socket.emit("new_convo", {
        contactID,
        firstName: contactFirstName,
        lastName: contactLastName
      }, ({ error, done, data }) => {
        if (done) {
          setState(prev => ({ ...prev, conversations: [data, ...prev.conversations] }));
          setSearchValue("");
          navigate(`/chat/${data.conversation_id}`);
          return;
        }
        console.log(error);
      });
    }
  };

  const handleKeyDown = (event, convoID) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const messageText = messageValue.trim();

      if (messageText) {
        const currentConvoIndex = state.conversations.findIndex(conversation => conversation.conversation_id === +convoID);

        if (!currentConvoIndex !== -1) {
          const currentConvo = state.conversations[currentConvoIndex];

          socket.emit("new_message", {
            messageText,
            convoID,
            contactID: currentConvo.otherParticipant.id,
            participating: currentConvo.otherParticipant.participating
          }, ({ error, done, data }) => {
            if (done) {
              const updatedCurrentConvo = {
                ...currentConvo,
                otherParticipant: {
                  ...currentConvo.otherParticipant,
                  participating: true
                },
                lastMessage: {
                  id: data.id,
                  senderContactId: data.contact_id,
                  messageText: data.message_text,
                  sentDateTime: data.sent_datetime
                },
                last_activity_datetime: data.sent_datetime
              };

              setState(prevState => ({
                ...prevState,
                conversations: [updatedCurrentConvo, ...prevState.conversations.slice(0, currentConvoIndex), ...prevState.conversations.slice(currentConvoIndex + 1)],
                messages: [...prevState.messages, data]
              }));
              setMessageValue("");
              return;
            }
            console.log(error);
          });
        }
      }
    }
  };

  useEffect(() => {
    socket.on('update_participant_status', (updatedParticipantStatus) => {
      setState(prevState => ({
        ...prevState,
        conversations: prevState.conversations.map(convo => {
          if (convo.conversation_id === updatedParticipantStatus.conversation_id) {
            return {
              ...convo,
              otherParticipant: {
                ...convo.otherParticipant,
                participating: updatedParticipantStatus.participating
              }
            };
          }
          return convo;
        })
      }));
    });

    socket.on('new_convo', (newConversationData) => {
      setState(prev => ({ ...prev, conversations: [newConversationData, ...prev.conversations] }));
    });

    socket.on('new_message', (newMessageData) => {
      const currentConvoIndex = state.conversations.findIndex(conversation => conversation.conversation_id === newMessageData.conversation_id);

      if (!currentConvoIndex !== -1) {
        const currentConvo = state.conversations[currentConvoIndex];

        const updatedCurrentConvo = {
          ...currentConvo,
          lastMessage: {
            id: newMessageData.id,
            senderContactId: newMessageData.contact_id,
            messageText: newMessageData.message_text,
            sentDateTime: newMessageData.sent_datetime
          },
          last_activity_datetime: newMessageData.sent_datetime,
          amIPresent: true
        };

        if (id && +id === newMessageData.conversation_id) {
          setState(prevState => ({
            ...prevState,
            conversations: [updatedCurrentConvo, ...prevState.conversations.slice(0, currentConvoIndex), ...prevState.conversations.slice(currentConvoIndex + 1)],
            messages: [...prevState.messages, newMessageData]
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            conversations: [updatedCurrentConvo, ...prevState.conversations.slice(0, currentConvoIndex), ...prevState.conversations.slice(currentConvoIndex + 1)]
          }));
        }
      }
    });

    return () => {
      socket.off('update_participant_status');
      socket.off('new_convo');
      socket.off('new_message');
    };
  });

  return {
    state,
    searchValue,
    setSearchValue,
    searchForUser,
    navigateToChat,
    removeYourselfFromConvo,
    searchListItemOnClick,
    messageValue,
    setMessageValue,
    handleKeyDown
  };
};