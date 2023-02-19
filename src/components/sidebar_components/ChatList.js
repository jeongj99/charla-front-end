import { useState, useEffect } from 'react';
import axios from "../../api/axios";
import './ChatList.css';
import ChatListItem from "./ChatListItem";

export default function ChatList(props) {
  const { chatListState, setChatListState, refreshMessages, refreshChatListState, setRefreshChatListState } = props;

  const fetchChatListInfo = async () => {
    const chatInfo = await axios.get('api/chat/list/message'); //This get request will retrieve the latest message from each of the conversations the logged in user has.
    for (const element of chatInfo.data) {
      const response = await axios.get('api/chat/list/profile', {
        params: {
          conversationID: element.conversation_id
        }
      });

      element.contact = response.data;
    }
    setChatListState(chatInfo);
  };
  
  useEffect(() => {
    try {
      fetchChatListInfo();
    } catch (err) {
      console.log(err);
    }
  }, [refreshMessages, refreshChatListState]); //Add refreshMessages to useEffect, so that if a message is submitted, refreshMessage state is updated, and as a side effect chatlistitem component will be dynamically updated.

  const listOfChats = chatListState.data?.map((chatObj) => {

    return (
      <ChatListItem
        key={chatObj.conversation_id}
        convoID={chatObj.conversation_id} //From each conversation object in the chatListState, we are going to pass down the conversation ID to the Chat List Item component.
        profileID={chatObj.contact.id}
        firstName={chatObj.contact.first_name}
        lastName={chatObj.contact.last_name}
        messageOwnerID={chatObj.message_owner_id}
        message={chatObj.message_text}
        profilePic={chatObj.contact.profile_photo_url}
        setRefreshChatListState={setRefreshChatListState} //Pass down setRefreshChatListState which will be called on selecting chat list item and starting new convo. It will reload the chatListState with newly added conversation and allow this users contact header to be loaded (since contact header dependent on contact info in chatListState). 
      />
    );
  });

  return (
    <div className="chat-list-container">
      <ul>
        {listOfChats}
      </ul>
    </div>


  );
}