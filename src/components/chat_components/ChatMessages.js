import './ChatMessages.css';
import ChatBubble from './ChatBubble';
import ScrollableFeed from 'react-scrollable-feed';

export default function ChatMessages(props) {
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
      <ScrollableFeed>
        {listOfMessages}
      </ScrollableFeed>
    </div>
  );
}
