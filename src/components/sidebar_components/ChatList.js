import { useEffect, useState } from 'react';
import axios from "../../api/axios";
import './ChatList.css';
import ChatListItem from "./ChatListItem";
import socket from "../../socket";

export default function ChatList(props) {
  const { chatListState, setChatListState, refreshMessages, setConvoMessages, convoDeleted, setConvoDeleted } = props;
  let socketChat = null;

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
      console.log(chatListState);
      socket.on('new_convo', chatData => {
        let socketChat = chatData.rows[0];
        console.log(socketChat);
      });
    } catch (err) {
      console.log(err);
    }
  }, [chatListState, fetchChatListInfo]); //Add refreshMessages to useEffect, so that if a message is submitted, refreshMessage state is updated, and as a side effect chatlistitem component will be dynamically updated.

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
        {socketChat &&
          <ChatListItem
            key={socketChat.conversation_id}
            convoID={socketChat.conversation_id}
            firstName={socketChat.contact.first_name}
            lastName={socketChat.contact.last_name}
            messageOwnerID={socketChat.message_owner_id}
            message={socketChat.message_text}
            profilePic={socketChat.contact.profile_photo_url}
            setConvoDeleted={setConvoDeleted}
            setConvoMessages={setConvoMessages}
          />}
        {listOfChats}
      </ul>
    </div>


  );
}