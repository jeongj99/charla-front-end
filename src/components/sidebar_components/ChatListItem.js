import { Profiler, useEffect, useState } from "react";
import "./ChatListItem.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ChatListItem(props) {
  // const [conversationSelected, setConversationSelected] = useState("")

  // useEffect(() => {
  //   axios.get(`api/chat`, {
  //     params: {
  //       ID: props.convoID
  //     }
  //   })
  //   .then(response => {
  //     console.log('Hello from axios fro NEW CONVERSATION', response.data);
  //   })
  //   .catch(err => console.log(err));

  // }, []);

  const navigate = useNavigate();

  const navigateToChat = function() {
    if (props.convoID) {
      navigate(`/chat/${props.convoID}`);
    } else {
      axios.post('api/newconversation', {

      }) 
    }
    // setConversationSelected(props.convoID);
  };

  return (
    <main className="chat-list-item-container" onClick={navigateToChat}>
      <div className="chat-list-item-user-photo-container">
        <img className="chat-list-item-user-photo" src={props.profilePic} />
      </div>
      <div className="chat-list-item-conversation">
        <h3>{props.firstName} {props.lastName}</h3>
        {
          props.profileID === props.messageOwnerID ? <p>{props.message}</p> : <p>You: {props.message}</p>
        }
      </div>
    </main>

  );

}