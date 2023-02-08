import './ChatMessages.css';
import ChatBubble from './ChatBubble';

export default function ChatMessages(props) {

  return (
    <div className="chat-messages">
      <h2>This is chat page and there is no id</h2>
      <ChatBubble />
    </div>
  );
}