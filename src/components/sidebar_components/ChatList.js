import { useState, useEffect } from 'react';

import './ChatList.css'

export default function ChatList(props) {

    useEffect(() => {
    async function fetchData() {
      //Use post request to create new game in DB, returns response object with information.
      let response = await fetch(`http://localhost:8001/api/chat/list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ user_id: userID }) // This line will be used later where we will pass the userID of individual logged in to acquire all the chats.
      });
      //Store new game information from DB in a variable
      let chatListData = await response.json();
      console.log(chatListData)
    }

    fetchData();
  }, []);

  return (
    <div className="chat-list-container">All the chats!</div>

  );
}