import React from 'react';
import { useParams } from 'react-router-dom';

import "./Chat.css";

export default function Chat() {
  const { id } = useParams();

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <div className="sidebar-logo">
            Charla
          </div>
          <div className="sidebar-chats">
            all the chats
          </div>
          <div className="sidebar-profile">
            Alex Jeong
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