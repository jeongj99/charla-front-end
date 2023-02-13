import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ChatInput.css";

export default function ChatInput(props) {
  const [userMessage, setUserMessage] = useState("")
  const [messageSubmitted, setMessageSubmitted] = useState("")
  // const [textAreaValue, setTextAreaValue] = useState(undefined);

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
  
  useEffect(() => {
    if (messageSubmitted === 'Message Submitted') {
      axios.post('api/messagesubmission', {
        messageSubmitted: userMessage
      })
      .then(response => {
        console.log('Hello from MESSAGE BUILDING', response.data);
      })
      .catch(err => console.log(err));
    }

  }, [messageSubmitted])


  return (
    <textarea value={userMessage} className="text-area" placeholder="Start a Charla!" onChange={userMessageInput} onKeyDown={handleKeyDown}></textarea>
  );
}