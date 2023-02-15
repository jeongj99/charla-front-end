import './ChatBubble.css'
import classNames from "classnames";


export default function ChatBubble(props) {
  let chatBubbleClass = classNames('chat-bubble-user-1', { "chat-bubble-user-2": props.contact === props.userID });
  
  return (
    <div className={chatBubbleClass}>
      {props.messages}
    </div>
  )
}