import './ChatMessages.css';
import ChatBubble from './ChatBubble';

export default function ChatMessages(props) {

  const listOfMessages = props.convoMessages.data?.map((msgObj) => {

    console.log(props.convoMessages.data)
    
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
        {listOfMessages}
    </div>
  );
}
