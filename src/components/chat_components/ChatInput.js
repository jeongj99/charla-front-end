import { useEffect, useState } from "react";
import "./ChatInput.css";

export default function ChatInput(props) {
  const [userMessage, setUserMessage] = useState("")
  const [messageSubmitted, setMessageSubmitted] = useState("")
  const [textAreaValue, setTextAreaValue] = useState(undefined);

  const userMessageInput = function(event) {
      setUserMessage(event.target.value)
      console.log(userMessage)
  }

  const handleKeyDown = function(event) {
    if (event.key === 'Enter') {
      setMessageSubmitted('Message Submitted')
      console.log('Handle Key down was executed')
    } else {
      return;
    }
  }
  
  useEffect(() => {
    if (messageSubmitted === 'Message Submitted') {
      setTextAreaValue('') 
      console.log('Hello from inside useEffect')
    }

  }, [messageSubmitted])


  return (
    <textarea value={textAreaValue} className="text-area" placeholder="Start a Charla!" onChange={userMessageInput} onKeyDown={handleKeyDown}></textarea>
  );
}