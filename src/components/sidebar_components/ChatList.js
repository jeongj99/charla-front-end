import { useState, useEffect } from 'react';
import axios from "axios";
import './ChatList.css'

export default function ChatList(props) {

  useEffect(() => {
    axios.get('http://localhost:8001/api/chat/list')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="chat-list-container">All the chats!</div>

  );
}