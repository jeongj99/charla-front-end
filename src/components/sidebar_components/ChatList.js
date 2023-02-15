import { useState, useEffect } from 'react';
import axios from "../../api/axios";
import './ChatList.css';
import ChatListItem from "./ChatListItem";

export default function ChatList(props) {
  const { chatListState, setChatListState, refreshMessages } = props;

  const fetchChatListInfo = async () => {
    const chatInfo = await axios.get('api/chat/list/message');
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
  }, [refreshMessages]); //Add refreshMessages to useEffect, so that if a message is submitted, refreshMessage state is updated, and as a side effect chatlistitem component will be dynamically updated.

  const listOfChats = chatListState.data?.map((chatObj) => {

    return (
      <ChatListItem
        key={chatObj.conversation_id}
        convoID={chatObj.conversation_id}
        profileID={chatObj.contact.id}
        firstName={chatObj.contact.first_name}
        lastName={chatObj.contact.last_name}
        messageOwnerID={chatObj.message_owner_id}
        message={chatObj.message_text}
        profilePic={chatObj.contact.profile_photo_url}
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