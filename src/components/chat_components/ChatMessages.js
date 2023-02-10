import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import './ChatMessages.css';
import ChatBubble from './ChatBubble';
import classNames from "classnames";

export default function ChatMessages(props) {
  const { auth } = useContext(AuthContext);
  // const [chatMessageAuthIdMatch, setchatMessageAuthIdMatch] = useState(false); //State for a chatMessages corresponding Contact ID.
  // let controlVariable = null;

  // let chatMessageClass = classNames('chat-bubble', { "chat-bubble-2": controlVariable });

  console.log('HELLO FROM ALL DATA', props.convoMessages.data)
  
  const listOfMessages = props.convoMessages.data?.map((msgObj) => {
    // if (msgObj.contact_id === auth.id) {
    //   controlVariable = true;
    // } else {
    //   controlVariable = null;
    // }
    
    console.log("Hello from True or False statement", msgObj.contact_id === auth.id )
    return (
      <ChatBubble
      key={msgObj.id}
      className={msgObj.contact_id === auth.id ? 'chat-bubble-2' : 'chat-bubble'}
      messages={msgObj.message_text}
      contact={msgObj.contact_id}
      dateTime={msgObj.sent_datetime}
      />
      );
    });
    

  return (
    <div className="chat-messages">
        {listOfMessages}
    </div>
  );
}
