import './ChatBubble.css'
import classNames from "classnames";


export default function ChatBubble(props) {
  let chatBubbleClass = classNames('chat-bubble-user-1', { "chat-bubble-user-2": props.contact % 2 == 0 });
  
  return (
    <div className={chatBubbleClass}>
      {props.messages}
    </div>
  )
}