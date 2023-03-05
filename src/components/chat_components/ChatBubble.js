import './ChatBubble.css';
import classNames from "classnames";


export default function ChatBubble(props) {
  let chatBubbleContainerClass = classNames('chat-bubble-container-1', { "chat-bubble-container-2": props.contact === props.userID, "chat-bubble-admin-container": props.contact === 5 }); //Important note, upon deployment if database is adjsuted and admin user is changed, we must change this number.
  let chatBubbleClass = classNames('chat-bubble-user-1', { "chat-bubble-user-2": props.contact === props.userID, "chat-bubble-admin-message": props.contact === 5 }); //Important note, upon deployment if database is adjsuted and admin user is changed, we must change this number.

  return (
    <div className={chatBubbleContainerClass}>
      <div className={chatBubbleClass}>
        {props.messages}
      </div>
    </div>
  );
}