import { useState } from "react";
import "./ChatInput.css";

export default function ChatInput(props) {
  const [userMessage, setUserMessage] = useState("")
  const [messageSubmitted, setmessageSubmitted] = useState("")

  // const detectKeyDown = (event) => {
  //   console.log("Clicked Key", event.key)
  // }
  
  const userMessageInput = function(event) {
      setUserMessage(event.target.value)
      console.log(userMessage);
  }

  const handleKeyDown = function(event) {
    if (event.key === 'Enter') {
      console.log('Your handle key function is working')
    }
  }


  return (
    <textarea className="text-area" placeholder="Start a Charla!" onChange={userMessageInput} onKeyDown={handleKeyDown}></textarea>
  );
}