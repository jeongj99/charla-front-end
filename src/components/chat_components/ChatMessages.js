import './ChatMessages.css';
import ChatBubble from './ChatBubble';
import classNames from "classnames";

//The bottom of this document contains extended notes related to this button component

// export default function Button(props) {
//   let buttonClass = classNames('button', { "button--confirm": props.confirm, "button--danger": props.danger });

//   return (<button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>);
// }

export default function ChatMessages(props) {
  let chatMessageClass = classNames('')

  const listOfMessages = props.convoMessages.data?.map((msgObj) => {

    return (
      <ChatBubble 
      key={msgObj.id}
      messages={msgObj.message_text}
      contact={msgObj.contact}
      dateTime={msgObj.sent_datetime}
      />
    )
  })

  return (
    <div className="chat-messages">
      <ul className="chat-messages-from-contact">
      {listOfMessages}
    </ul>
    </div>
  );
}