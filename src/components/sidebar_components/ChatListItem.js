import { Profiler, useEffect, useState } from "react";
import "./ChatListItem.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ChatListItem(props) {
  const [userID, setUserID] = useState("") //This state will house the userID of the logged in individual retrieved from the back end.
  let newConvoID = ""; //This state will house the conversation ID of the newly created conversation via POST route, plugged in to useNavigate to load/start conversation with this individual.

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

  //This function will be called after the POST request that creates a new conversation below. This function gets that newly created conversation, specifically the ID, so that we can then useNavigate to chat/newConvoID.
  const getTheNewlyCreatedConversation = function(userID) {
    axios.get('api/getthenewconversation', {
      params: {
        id: userID, //This is the ID of the individual logged in.
        contactid: props.contactID //This is the ID of the individual you are trying to start a conversation with. Will use both ID to db query and get correct conversation.
      }
    })
    .then(response => {
      newConvoID = response.data.rows[0].conversation_id;
      navigate(`/chat/${newConvoID}`);
    })
    .catch(err => console.log(err));
  }

  //The navigate to chat function will check if a convoID exists for this chatListItem component. If so, it will open the conversation, if not POST request to create new conversation with the selected contact from search.
  const navigateToChat = function() {
    if (props.convoID) {
      navigate(`/chat/${props.convoID}`);
    } else {
      axios.post('api/newconversation', {
        contactid: props.contactID //Send over the contact ID of the selected user to the back end, will create new convo in DB between this ID and logged in user ID.
      })
      .then(response => {
        setUserID(response.data.id) //This sets the state of the userID to the ID of the user who is logged in, sent from backend.
        getTheNewlyCreatedConversation(userID) //This function will now GET the conversation that was just created (POST) between selected user and logged in user. We pass it the ID of the contact we are starting convo with.
      })
      .catch(err => console.log(err));
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