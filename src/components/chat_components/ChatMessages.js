import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import './ChatMessages.css';
import ChatBubble from './ChatBubble';
import classNames from "classnames";

//The bottom of this document contains extended notes related to this button component

// export default function Button(props) {
//   let buttonClass = classNames('button', { "button--confirm": props.confirm, "button--danger": props.danger });

//   return (<button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>);
// }

export default function ChatMessages(props) {
  const { auth } = useContext(AuthContext);
  // const [chatMessageAuthIdMatch, setchatMessageAuthIdMatch] = useState(false); //State for a chatMessages corresponding Contact ID.
  let controlVariable = null;

  let chatMessageClass = classNames('chat-messages-default', { "chat-messages-sent-by-you": controlVariable });

  console.log('HELLO FROM ALL DATA', props.convoMessages.data)
  
  const listOfMessages = props.convoMessages.data?.map((msgObj) => {
    if (msgObj.contact_id === auth.id) {
      controlVariable = true;
    } else {
      controlVariable = null;
    }
    
    console.log("Hello from True or False statement", msgObj.contact_id === auth.id )
    return (
      <ChatBubble
      key={msgObj.id}
      messages={msgObj.message_text}
      contact={msgObj.contact_id}
      dateTime={msgObj.sent_datetime}
      />
      );
    });
    

  return (
    <div className="chat-messages">
      <ul className={chatMessageClass}>
        {listOfMessages}
      </ul>
    </div>
  );
}
