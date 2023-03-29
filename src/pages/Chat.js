// import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from "../api/axios";

import SideBarSearch from '../components/sidebar_components/SideBarSearch';
import ChatList from '../components/sidebar_components/ChatList';
import SearchList from '../components/sidebar_components/SearchList';
import ChatInput from '../components/chat_components/ChatInput';
import ChatMessages from '../components/chat_components/ChatMessages';
import SidebarProfile from '../components/sidebar_components/SidebarProfile';
import ChatContactHeader from '../components/chat_components/ChatContactHeader';
import useChatData from "../hooks/useChatData";
import { getContactInfoForConvo } from "../helpers/selectors";

import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";

export default function Chat() {
  const { id } = useParams(); //Refers to the /ID in the URL, will be set by UseNavigate in ChatListItem

  const {
    state,
    searchValue,
    setSearchValue,
    navigateToChat
  } = useChatData(id);


  const contactInfo = getContactInfoForConvo(state, id);

  return (
    <>
      {state && <div className="chat-container">
        <div className="top-bar">
          <div className="topbar-logo">
            Charla <SiXdadevelopers className='charlaLogo' />
          </div>
          {id && <ChatContactHeader contactInfo={contactInfo} />}
        </div>
        <div className="chat-main-container">
          <aside className="sidebar">
            <SideBarSearch value={searchValue} onChange={setSearchValue} />
            {state.searchedUsers ? <SearchList searchedUsers={state.searchedUsers} /> : <ChatList conversationsList={state.conversations} navigateToChat={navigateToChat} />}
            <div className="sidebar-profile">
              <SidebarProfile />
            </div>
          </aside>
          <section className="chat">
            {(id && state.messages) && <ChatMessages messagesList={state.messages} />}
            {/* <ChatInput setRefreshMessages={setRefreshMessages} convoID={id} /> */}
          </section>
        </div>
      </div>}
    </>
  );
}