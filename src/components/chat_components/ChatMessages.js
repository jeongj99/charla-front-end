import './ChatMessages.css';
import ChatBubble from './ChatBubble';

export default function ChatMessages(props) {

  const listOfMessages = props.convoMessages?.map((msgObj) => {

    return (
      <ChatBubble 
      key={msgObj.id}
      messages={msgObj.message_text}
      contact={msgObj.contact_id}
      dateTime={msgObj.sent_datetime}
      />
    )
  })

  return (
    <div className="chat-messages">
      <h2>This is chat page and there is no id</h2>
      <ul>
      {listOfMessages}
    </ul>
    </div>
  );
}