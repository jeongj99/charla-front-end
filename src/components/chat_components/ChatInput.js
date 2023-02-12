import { useState } from "react";
import "./ChatInput.css";

export default function ChatInput(props) {
  const [userMessage, setUserMessage] = useState("")

  const userMessageInput = function(event) {
    setUserMessage(event.target.value)
    console.log(userMessage);
  }

  return (
    <textarea className="text-area" placeholder="Start a Charla!" onChange={userMessageInput}></textarea>
  );
}