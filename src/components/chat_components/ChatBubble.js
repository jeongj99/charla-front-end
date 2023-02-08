import './ChatBubble.css'

export default function ChatBubble(props) {

  return (
    <div className="chat-bubble">
      {props.messages}
    </div>
  )
}