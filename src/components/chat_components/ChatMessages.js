import './ChatMessages.css';
import ChatBubble from './ChatBubble';
import { useEffect, useRef } from 'react';

export default function ChatMessages(props) {
  const messageEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    })
  }

  useEffect(() => {
    if (props.refreshMessages !== null) {
      scrollToBottom();
    }
  }, [props.refreshMessages]);

  const listOfMessages = props.convoMessages.rows?.map((msgObj) => {

    return (
      <ChatBubble
        key={msgObj.id}
        messages={msgObj.message_text}
        contact={msgObj.contact_id}
        dateTime={msgObj.sent_datetime}
        userID={props.userID}
      />
      );
    });
    
    
    return (
      <div className="chat-messages">
      {listOfMessages}
      <div ref={messageEndRef} />
    </div>
  );
}
