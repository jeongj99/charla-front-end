import './ChatBubble.css'

export default function ChatBubble(props) {

  return (
    <div className={props.className}>
      {props.messages}
    </div>
  )
}