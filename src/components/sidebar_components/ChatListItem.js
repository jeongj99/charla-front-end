import "./ChatListItem.css";

export default function ChatListItem(props) {
  return (
    <main className="chat-list-item-container" onClick={() => props.navigateToChat(props.convoID)}>
      <div className="chat-list-item-user-photo-container">
        <img className="chat-list-item-user-photo" alt='profile-pic' src={props.profilePic} />
      </div>
      <div className="chat-list-item-conversation">
        <h3>{props.firstName} {props.lastName}</h3>
        {
          props.profileID === props.messageOwnerID || props.messageOwnerID === 5 ? <p>{props.message}</p> : <p>You: {props.message}</p>
        }
      </div>
      <i className='fa-solid fa-xmark' onClick={event => props.removeYourselfFromConvo(event, props.convoID)}></i>
    </main>
  );
}