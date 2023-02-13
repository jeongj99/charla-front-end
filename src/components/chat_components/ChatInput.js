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
  //IF enter button clicked, then make AXIOS post request and deposit userMessage into the database
  useEffect(() => {
    if (messageSubmitted === 'Message Submitted') {
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
    }

  }, [messageSubmitted])


  return (
    <textarea value={userMessage} className="text-area" placeholder="Start a Charla!" onChange={userMessageInput} onKeyDown={handleKeyDown}></textarea>
  );
}