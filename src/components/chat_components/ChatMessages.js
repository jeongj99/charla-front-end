import "./ChatMessages.css";
import ChatBubble from "./ChatBubble";
import ScrollableFeed from "react-scrollable-feed";

export default function ChatMessages({ messagesList }) {
  const listOfMessages = messagesList.map((message) => {
    return (
      <ChatBubble
        key={message.id}
        messages={message.message_text}
        contact={message.contact_id}
        dateTime={message.sent_datetime}
      />
    );
  });

  return (
    <div className="chat-messages-container">
      <ScrollableFeed>{listOfMessages}</ScrollableFeed>
    </div>
  );
}
