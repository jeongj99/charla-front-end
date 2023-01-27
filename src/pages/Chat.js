import React from 'react';
import { useParams } from 'react-router-dom';
import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";
import SideBarSearch from '../components/sidebar_components/SideBarSearch'
import ChatList from '../components/sidebar_components/ChatList';

import ChatInput from '../components/chat_components/ChatInput'

export default function Chat() {
  const { id } = useParams();

  return (
    <>
      <div className="chat-container">
        <div className="top-bar">
          <div className="topbar-logo">
            Charla <SiXdadevelopers className='charlaLogo' />
          </div>
          <div className="chat-info">
            John
          </div>
        </div>
        <div className="chat-main-container">
          <aside className="sidebar">
            <SideBarSearch />
            <ChatList />
            <div className="sidebar-profile">
              Alex Jeong with profile pic
            </div>
          </aside>
          <section className="chat">
            <div className="chat-message">
              {id ? <h2>This is chat page and id is {id}</h2> : <h2>This is chat page and there is no id</h2>}
            </div>
            <ChatInput />
          </section>
        </div>
      </div>
    </>
  );
}