import { useState, useEffect } from 'react';
import axios from "axios";
import './ChatList.css';
import ChatListItem from "./ChatListItem";

export default function ChatList(props) {

  const [chatListState, setChatListState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8001/api/chat/list')
      .then(response => {
        setChatListState(response);
      })
      .catch(err => console.log(err));
  }, [chatListState]);


  const listOfChats = chatListState.data?.map((chatObj) => {
    console.log('Hello from ChatObj', chatObj);

    return (
      <ChatListItem 
      
      />
    );
  });

  return (
    <div className="chat-list-container">All the chats!
    <ul>
      {listOfChats}
    </ul>
    </div>


  );
}