import { useState, useEffect } from 'react';
import axios from "../../api/axios";
import './ChatList.css';
import ChatListItem from "./ChatListItem";

export default function ChatList(props) {
  const { chatListState, setChatListState, refreshMessages, setConvoMessages, convoDeleted, setConvoDeleted } = props;  

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
  }, [refreshMessages, convoDeleted]); //Add refreshMessages to useEffect, so that if a message is submitted, refreshMessage state is updated, and as a side effect chatlistitem component will be dynamically updated.

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
        setConvoDeleted={setConvoDeleted}
        setConvoMessages={setConvoMessages}
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