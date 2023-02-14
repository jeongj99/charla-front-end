import './ChatMessages.css';
import ChatBubble from './ChatBubble';
import { useEffect, useRef } from 'react';

export default function ChatMessages(props) {
  const messageEndRef = useRef(null);
  
  //This function when called will scroll to the location of the dummy div messageEndRef, which is at the bottom of the chat messages
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    })
  }

  //Use Effect hook allows for scroll to bottom function to be triggered each time messages are refreshed!
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
