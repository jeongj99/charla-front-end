import { useState, useEffect } from 'react';
import axios from "../../api/axios";
import './ChatList.css';
import ChatListItem from "./ChatListItem";

export default function ChatList(props) {
  const [chatListState, setChatListState] = useState(false);

  const fetchChatListInfo = async () => {
    const chatInfo = await axios.get('api/chat/list/message');

    console.log(chatInfo.data);

    for (const element of chatInfo.data) {
      const response = await axios.get('api/chat/list/profile', {
        params: {
          conversationID: element.conversation_id
        }
      });

      element.contact_id = response.data.contact_id;
    }
    console.log(chatInfo.data);

    setChatListState(chatInfo);
  };

  useEffect(() => {
    try {
      fetchChatListInfo();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const listOfChats = chatListState.data?.map((chatObj) => {

    return (
      <ChatListItem
        key={chatObj.conversation_id}
        convoID={chatObj.conversation_id}
        firstName={chatObj.first_name}
        lastName={chatObj.last_name}
        message={chatObj.message_text}
        profilePic={chatObj.profile_photo_url}
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