import './ChatMessages.css';
import ChatBubble from './ChatBubble';
import ScrollableFeed from 'react-scrollable-feed';
import { useEffect } from 'react';

export default function ChatMessages(props) {
  const { userID, setConvoMessages, convoDeleted } = props;

  useEffect(() => {
    setConvoMessages("")

  }, [convoDeleted])

  const listOfMessages = props.convoMessages.rows?.map((msgObj) => {

    return (
      <ChatBubble
        key={msgObj.id}
        messages={msgObj.message_text}
        contact={msgObj.contact_id}
        dateTime={msgObj.sent_datetime}
        userID={userID}
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
