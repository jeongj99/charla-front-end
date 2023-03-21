import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../api/axios";

import SideBarSearch from '../components/sidebar_components/SideBarSearch';
import ChatList from '../components/sidebar_components/ChatList';
import SearchList from '../components/sidebar_components/SearchList';
import ChatInput from '../components/chat_components/ChatInput';
import ChatMessages from '../components/chat_components/ChatMessages';
import SidebarProfile from '../components/sidebar_components/SidebarProfile';
import ChatContactHeader from '../components/chat_components/ChatContactHeader';
import useChatData from "../hooks/useChatData";

import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";

export default function Chat() {
  const { id } = useParams(); //Refers to the /ID in the URL, will be set by UseNavigate in ChatListItem

  const {
    state,
  } = useChatData();

  console.log(state);

  // //Axios Request for Search Bar in SideBar. This along with search states above lifted into this Chat Page so that either ChatList or SearchList can be loaded in sidebar based on state of search.
  // useEffect(() => {
  //   //IF statement added in order to ensure useEffect only triggered when search bar is receiving input
  //   if (searchUser.length > 0) {
  //     axios.get('api/searchuser', {
  //       params: {
  //         searchedUser: searchUser
  //       }
  //     })
  //       .then(response => {
  //         console.log('Hello from axios', response.data);
  //         setUsersFound(response);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, [searchUser]);

  // const SearchForUser = function(event) {
  //   setSearchUser(event.target.value);
  // };

  return (
    <>
      <div className="chat-container">
        {/* <div className="top-bar">
          <div className="topbar-logo">
            Charla <SiXdadevelopers className='charlaLogo' />
          </div>
          {id && <ChatContactHeader chatListState={chatListState} id={id} />}
        </div>
        <div className="chat-main-container">
          <aside className="sidebar">
            <SideBarSearch searchUser={searchUser} SearchForUser={SearchForUser} />
            {searchUser ? <SearchList setSearchUser={setSearchUser} usersFound={usersFound} /> : <ChatList convoDeleted={convoDeleted} setConvoDeleted={setConvoDeleted} setConvoMessages={setConvoMessages} chatListState={chatListState} setChatListState={setChatListState} refreshMessages={refreshMessages} />}
            <div className="sidebar-profile">
              <SidebarProfile />
            </div>
          </aside>
          <section className="chat">
            <ChatMessages convoDeleted={convoDeleted} userID={userID} setConvoMessages={setConvoMessages} convoMessages={convoMessages} refreshMessages={refreshMessages} />
            <ChatInput setRefreshMessages={setRefreshMessages} convoID={id} />
          </section>
        </div> */}
        Hello
      </div>
    </>
  );
}