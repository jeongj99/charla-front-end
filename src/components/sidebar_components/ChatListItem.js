import { Profiler } from "react";
import "./ChatListItem.css"

export default function ChatListItem(props) {

  return (
    <main className="chat-list-item-container">
      <div className="chat-list-item-user-photo-container">
      <img className="chat-list-item-user-photo" src={props.profilePic}/>
      </div>
      <div className="chat-list-item-conversation">
        <h3>{props.firstName} {props.lastName}</h3>
        <p>{props.message}</p>
        </div>
    </main>

  );

}