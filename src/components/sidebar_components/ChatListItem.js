import { Profiler, useEffect, useState } from "react";
import "./ChatListItem.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function ChatListItem(props) {
  const { setSearchUser, setConvoDeleted, setConvoMessages } = props;
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
  const getTheNewlyCreatedConversation = function() {
    axios.get('api/getthenewconversation', {
      params: {
        contactid: props.contactID //This is the ID of the individual you are trying to start a conversation with. Will use both IDs to db query and get correct conversation.
      }
    })
      .then(response => {
        newConvoID = response.data.rows[0].conversation_id;
        navigate(`/chat/${newConvoID}`);
        setSearchUser(""); //Upon getting the new conversation, we clear the searchUser state so that chat list is now rerendered with new convo you just started as a part of the list, instead of search list.
      })
      .catch(err => console.log(err));
  };

  //The navigate to chat function will check if a convoID exists for this chatListItem component. If so, this mean it is a preexisting convo in the Chat List and it will open the conversation. If not POST request will be made to create new conversation with the user(chat list item) you clicked on.
  const navigateToChat = function() {
    if (props.convoID) { //Props.Convo ID is present when simply clicking on a chat list item that is already loaded in your chat list. If it is null, this means that you are clicking on a chat list item from the search list.
      navigate(`/chat/${props.convoID}`);
    } else {
      axios.get('api/getthenewconversation', {
        params: {
          contactid: props.contactID //This contact ID is passed down from the search list to chat list item component.
        }
      })
        .then(response => {
          console.log('Hello from your response IN THE NEW PROMISES', response);
          newConvoID = response.data.rows[0];
          if (!newConvoID) {
            axios.post('api/newconversation', {
              contactid: props.contactID, //Send over the contact ID of the selected user to the back end, will create new convo in DB between this ID and logged in user ID.
              firstName: props.firstName, //Send over first name and last name in order to insert into intro message addressing who you started convo with.
              lastName: props.lastName
            })
              .then(response => {
                getTheNewlyCreatedConversation(); //This function will now GET the conversation that was just created (POST) between selected user and logged in user. We pass it the ID of the contact we are starting convo with.
                newConvoID = "";
              })
              .catch(err => console.log(err));
          } else {
            navigate(`/chat/${newConvoID.conversation_id}`);
            setSearchUser("");
            newConvoID = "";
          }
        })
        .catch(err => console.log(err));
    }
  };

  const deleteConvo = function() {
    axios.delete('api/deleteparticipant', {
      params: {
        convoID: props.convoID
      }
    })
    .then(response => {
      console.log('HELLO FROM DELETE RESPONSE ON WEDNESDAY', response);
      setConvoDeleted(response);
      setConvoMessages("")
      navigate('/chat')
    })
    .catch(err => console.log(err));
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
      <i onClick={deleteConvo} className="fa-solid fa-xmark"></i>
    </main>
  );
}