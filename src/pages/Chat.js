import { useParams } from 'react-router-dom';

import SideBarSearch from '../components/sidebar_components/SideBarSearch';
import ChatList from '../components/sidebar_components/ChatList';
import SearchList from '../components/sidebar_components/SearchList';
import ChatInput from '../components/chat_components/ChatInput';
import ChatMessages from '../components/chat_components/ChatMessages';
import SidebarProfile from '../components/sidebar_components/SidebarProfile';
import ChatContactHeader from '../components/chat_components/ChatContactHeader';
import useChatData from "../hooks/useChatData";
import { getContactInfoForConvo, getFilteredConversations } from "../helpers/selectors";

import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";
import { useState } from 'react';

export default function Chat() {
  const { id } = useParams(); //Refers to the /ID in the URL, will be set by UseNavigate in ChatListItem
  const [showChat, setShowChat] = useState(false)

  const {
    state,
    searchValue,
    setSearchValue,
    navigateToChat,
    removeYourselfFromConvo,
    searchListItemOnClick,
    messageValue,
    setMessageValue,
    handleKeyDown
  } = useChatData(id);

  const displayChat = () => {
    setShowChat (true)
  }

  const contactInfo = getContactInfoForConvo(state, id);

  const chatList = getFilteredConversations(state);

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
          <aside className={showChat ? "sidebar-once-chat-item-clicked-in-mobile" : "sidebar"}>
            <SideBarSearch value={searchValue} onChange={setSearchValue} />
            {state.searchedUsers ? <SearchList searchedUsers={state.searchedUsers} searchListItemOnClick={searchListItemOnClick} /> : <ChatList displayChat={displayChat} chatList={chatList} navigateToChat={navigateToChat} removeYourselfFromConvo={removeYourselfFromConvo} />}
            <div className="sidebar-profile">
              <SidebarProfile />
            </div>
          </aside>
          <section className={showChat ? "chat-mobile": "chat"}>
            {
              (id && state.messages) ?
                <ChatMessages messagesList={state.messages} /> :
                <div className="chat-no-convo">
                  <h3>Select a conversation</h3>
                </div>
            }
            {
              id &&
            <ChatInput showChat={showChat} convoID={id} value={messageValue} onChange={setMessageValue} handleKeyDown={handleKeyDown} />
            }
          </section>
        </div>
      </div>}
    </>
  );
}