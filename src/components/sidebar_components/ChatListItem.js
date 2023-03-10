import { Profiler, useEffect, useState } from "react";
import "./ChatListItem.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

export default function ChatListItem(props) {
  const { setSearchUser, setConvoDeleted, message } = props;
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

  //COMMENT OUT FOR NOW!!!!!!!!!
  // const getTheNewlyCreatedConversation = function() {
  //   axios.get('api/getthenewconversation', {
  //     params: {
  //       contactid: props.contactID //This is the ID of the individual you are trying to start a conversation with. Will use both IDs to db query and get correct conversation.
  //     }
  //   })
  //     .then(response => {
  //       newConvoID = response.data.rows[0].conversation_id;
  //       navigate(`/chat/${newConvoID}`);
  //       setSearchUser(""); //Upon getting the new conversation, we clear the searchUser state so that chat list is now rerendered with new convo you just started as a part of the list, instead of search list.
  //     })
  //     .catch(err => console.log(err));
  // };

  //The navigate to chat function will check if a props.convoID exists for this chatListItem component. If so, this mean it is a preexisting convo in the CHAT LIST and it will open the conversation. If not, this means we are clicking from SEARCH LIST and POST request will be made to create new conversation with the user(chat list item) you clicked on.
  const navigateToChat = function() {
    if (props.convoID) { //Props.Convo ID is present when simply clicking on a chat list item that is already loaded in your chat list. If it is null, this means that you are clicking on a chat list item from the search list.
      navigate(`/chat/${props.convoID}`);
    }
    //If there is no props.convoID present, that means we are clicking on chat list item from search list and thus want to eihter: Start a new convo OR open an existing conversation we previously closed.
    else {
      axios.get('api/getthenewconversation', {
        params: {
          contactid: props.contactID //This contact ID of user you clicked on is passed down from the search list to chat list item component.
        }
      })
        .then(response => {
          newConvoID = response.data.rows[0];
          //If the convoID from the get request is null, this means no convo exists between you and this user. So we are going to make a post request to start a new conversation with this indivdual. 
          if (!newConvoID) {
            // COMMENT OUT FOR NOW TO DO SOCKET LOGIC!!!!!!
            // axios.post('api/newconversation', {
            //   contactid: props.contactID, //Send over the contact ID of the selected user to the back end, will create new convo in DB between this ID and logged in user ID.
            //   firstName: props.firstName, //Send over first name and last name in order to insert into intro message addressing who you started convo with.
            //   lastName: props.lastName
            // })
            //   .then(response => {
            //     getTheNewlyCreatedConversation(); //This function will now GET the conversation that was just created (POST) between selected user and logged in user. We pass it the ID of the contact we are starting convo with.
            //     newConvoID = "";
            //   })
            //   .catch(err => console.log(err));
            socket.emit("new_convo", {
              contactid: props.contactID,
              firstName: props.firstName,
              lastName: props.lastName
            }, ({ error, done }) => {
              if (done) {
                navigate(`/chat/${newConvoID}`);
                setSearchUser("");
                newConvoID = "";
                return;
              }
              console.log(error);
            });
          }
          else {
            // //If the convoID here is not null, this means it was a conversation that still exists, but we had previously closed (removed ourselves as a participant). Thus we want to insert ourselves back as a participant in the conversation!
            axios.post('api/addparticipantbacktoconvo', {
              convoID: newConvoID
            })
              .then(response => {
                navigate(`/chat/${newConvoID.conversation_id}`);
                setSearchUser("");
                newConvoID = "";
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  };

  const deleteConvo = function(event) {
    event.stopPropagation(); //Add event stop propogation to prevent bubbling  that could trigger navigatetochat which would cause loading of messages after clicking delete (since <i> is in <main>)
    axios.delete('api/deleteparticipant', {
      params: {
        convoID: props.convoID
      }
    })
      .then(response => {
        console.log('HELLO FROM DELETE RESPONSE ON WEDNESDAY', response);
        setConvoDeleted(response);
        navigate('/chat');
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
          props.profileID === props.messageOwnerID || props.messageOwnerID === 5 ? <p>{props.message}</p> : <p>You: {props.message}</p>
        }
      </div>
      { //Here if a message is present in the chat list item component, this means it is in the chat list not the search list. Only apply X for delte convo when in chat list.
        message ? <i onClick={deleteConvo} className={'fa-solid fa-xmark'}></i> : <i className={''}></i>
      }
    </main>
  );
}