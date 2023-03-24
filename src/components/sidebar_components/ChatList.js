import { useEffect, useState } from 'react';
import axios from "../../api/axios";
import './ChatList.css';
import ChatListItem from "./ChatListItem";
import socket from "../../socket";

export default function ChatList({ conversationsList }) {
  socket.on('new_convo', chatData => {
    let socketChat = chatData.rows[0];
    console.log(socketChat);
  });

  const listOfChats = conversationsList.map(conversation => {

    return (
      <ChatListItem
        key={conversation.conversation_id}
        convoID={conversation.conversation_id} //From each conversation object in the chatListState, we are going to pass down the conversation ID to the Chat List Item component.
        profileID={conversation.otherParticipant.id}
        firstName={conversation.otherParticipant.firstName}
        lastName={conversation.otherParticipant.lastName}
        profilePic={conversation.otherParticipant.profilePhotoUrl}
        messageOwnerID={conversation.lastMessage.senderContactID}
        message={conversation.lastMessage.messageText}
      />
    );
  });

  return (
    <div className="chat-list-container">
      <ul>
        {/* {socketChat &&
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
          />} */}
        {listOfChats}
      </ul>
    </div>


  );
}