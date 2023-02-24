import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ChatInput.css";

export default function ChatInput(props) {
  const [userMessage, setUserMessage] = useState("") //This state holds the current user Message being typed and represents what is being seen on the textarea value
  const [messageSubmitted, setMessageSubmitted] = useState("") //This state confirms whether a messaege has been submitted via clicking the enter button

  const userMessageInput = function(event) {
      setUserMessage(event.target.value)
      console.log(userMessage)
  }

  const handleKeyDown = function(event) {
    if (event.key === 'Enter') {
      setMessageSubmitted('Message Submitted')
      // setUserMessage("")
      console.log('Handle Key down was executed')
    } else {
      return;
    }
  }
  
  //If enter button clicked, we change messageSubmitted state and trigger axios post request.
  useEffect(() => {
    if (messageSubmitted === 'Message Submitted') {

      //Upon message submitted state being properly updated we first make a get request to check that both individuals are present within the conversation before sending a new message.
      axios.get('api/participantspresent', {
        params: {
          convoID: props.convoID
        }
      })
      .then(response => {
        let loggedInUserID = response.data.loggedInUserID;
        let firstParticipant = response.data.rows[0];
        let secondParticipant = response.data.rows[1];

        //Check if BOTH the first participant and second participant are in the convo (not null), and if one of their ids are equal to the loggedinUserID. If so, then loggedInUser is a participant in convo and as a result can send message.
        if ((firstParticipant && secondParticipant) && (firstParticipant.contact_id === loggedInUserID || secondParticipant.contact_id === loggedInUserID)) {
          axios.post('api/messagesubmission', {
            messageSubmitted: userMessage,
            convoID: props.convoID
          })
          .then(response => {
            setUserMessage("") //Reset states upon response to prepare for next message to be sent
            setMessageSubmitted("")
            props.setRefreshMessages(response.data) //Although response.data empty, this allows for trigger in state refreshMessage state, used to refresh Chat-Messages and ChatListItem component with latest message!
          })
          .catch(err => console.log(err));
        } else {
          //If the logged in user did not match any of the returning participants, or if one of the values is null, then we post request to add the logged in user as participant back to the convo, and then once they are added back, make same post request for message submission.
          axios.post('api/addparticipantbacktoconvo', {
            convoID: props.convoID
          })
          .then(response => {
            axios.post('api/messagesubmission', {
              messageSubmitted: userMessage,
              convoID: props.convoID
            })
            .then(response => {
              setUserMessage("") //Reset states upon response to prepare for next message to be sent
              setMessageSubmitted("")
              props.setRefreshMessages(response.data) //Although response.data empty, this allows for trigger in state refreshMessage state, used to refresh Chat-Messages and ChatListItem component with latest message!
            })
            .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    }
  }, [messageSubmitted])


  return (
    <textarea value={userMessage} className="text-area" placeholder="Start a Charla!" onChange={userMessageInput} onKeyDown={handleKeyDown}></textarea>
  );
}