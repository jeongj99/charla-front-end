import './ChatBubble.css'
import classNames from "classnames";


export default function ChatBubble(props) {
  let chatBubbleClass = classNames('chat-bubble-user-1', { "chat-bubble-user-2": props.contact === props.userID, "chat-bubble-admin-message": props.contact === 5 }); //Important note, upon deployment if database is adjsuted and admin user is changed, we must change this number.
  
  return (
    <div className={chatBubbleClass}>
      {props.messages}
    </div>
  )
}