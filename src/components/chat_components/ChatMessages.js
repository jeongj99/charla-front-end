import './ChatMessages.css';
import ChatBubble from './ChatBubble';

export default function ChatMessages(props) {

  const listOfMessages = props.convoMessages.data?.map((msgObj) => {

    return (
      <ChatBubble 
      key={msgObj.id}
      messages={msgObj.message_text}
      contact={msgObj.contact}
      dateTime={msgObj.sent_datetime}
      />
    )
  })

  return (
    <div className="chat-messages">
      <ul>
      {listOfMessages}
    </ul>
    </div>
  );
}