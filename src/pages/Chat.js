import React from 'react';
import { useParams } from 'react-router-dom';
import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";

export default function Chat() {
  const { id } = useParams();

  return (
    <>
      <div className="chat-container">
        <aside className="sidebar">
          <div className="sidebar-logo">
            Charla <SiXdadevelopers className='charlaLogo' />
          </div>
          <div className="sidebar-search">
            Search person
          </div>
          <div className="sidebar-chats">
            all the chats
          </div>
          <div className="sidebar-profile">
            Alex Jeong with profile pic
          </div>
        </aside>
        <section className="chat">
          <div className="chat-info">
            John
          </div>
          <div className="chat-message">
            {id ? <h2>This is chat page and id is {id}</h2> : <h2>This is chat page and there is no id</h2>}
          </div>
          <div className="chat-input">
            Type a message
          </div>
        </section>
      </div>
    </>
  );
}