import { useState, useEffect } from 'react';
import axios from "axios";
import './ChatList.css'

export default function ChatList(props) {
  const [chatListState, setChatListState] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8001/api/chat/list')
    .then(response => {
      setChatListState(response.data)
      console.log(setChatListState);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="chat-list-container">All the chats!</div>

  );
}