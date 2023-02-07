import { Profiler, useEffect, useState } from "react";
import "./ChatListItem.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChatListItem(props) {
  const [conversationSelected, setConversationSelected] = useState("")
  
  const navigate = useNavigate();
  
  const navigateToChat = function() {
    navigate(`/chat/${props.convoID}`);
    setConversationSelected(props.convoID);
  };
  
  useEffect(() => {
      axios.get(`api/chat/${props.convoID}`, {
        params: {
          ID: props.convoID
        }
      })
        .then(response => {
          console.log('Hello from axios fro NEW CONVERSATION', response.data);
        })
        .catch(err => console.log(err));

  }, [conversationSelected]);

  return (
    <main className="chat-list-item-container" onClick={navigateToChat}>
      <div className="chat-list-item-user-photo-container">
      <img className="chat-list-item-user-photo" src={props.profilePic}/>
      </div>
      <div className="chat-list-item-conversation">
        <h3>{props.firstName} {props.lastName}</h3>
        <p>{props.message}</p>
        </div>
    </main>

  );

}