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

import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";

export default function Chat() {
  const { id } = useParams(); //Refers to the /ID in the URL, will be set by UseNavigate in ChatListItem
  const [searchUser, setSearchUser] = useState(""); //State for searching a user in search bar. If value "", then no chat list items rendered.
  const [usersFound, setUsersFound] = useState(""); //State for response of searched user
  const [convoMessages, setConvoMessages] = useState(""); //This state holds all the messages for the selected Chat List Item.
  const [userID, setUserId] = useState(""); //This state holds the ID of the user who is currently logged in
  const [refreshMessages, setRefreshMessages] = useState(""); //State for messages submission. If message submitted, state updated, and chat list item and chat messages dynamically updated.
  const [chatListState, setChatListState] = useState(false); //State used for housing axios get request contact information to fill Chat List Items. This info will also be passed to Chat Contact Header to display contact profile picture and name.
  const [convoDeleted, setConvoDeleted] = useState(""); //This state is triggered when the delete convo button is clicked, and is used in the useEffect to refresh the chat list when delte convo occurs. 

  useEffect(() => {
    if (id) {
      axios.get('api/chat', {
        params: {
          id: id
        }
      })
        .then(response => {
          setConvoMessages(response.data);
          console.log('Hello from Convo Messages STATE on THURSDAY AFTER INTERVIEW', convoMessages);
          setUserId(response.data.id);
          console.log('Hello from USER ID in CHAT', userID);
        })
        .catch(err => console.log(err));
    }
  }, [id, refreshMessages]);

  //Axios Request for Search Bar in SideBar. This along with search states above lifted into this Chat Page so that either ChatList or SearchList can be loaded in sidebar based on state of search.
  useEffect(() => {
    //IF statement added in order to ensure useEffect only triggered when search bar is receiving input
    if (searchUser.length > 0) {
      axios.get('api/searchuser', {
        params: {
          searchedUser: searchUser
        }
      })
        .then(response => {
          console.log('Hello from axios', response.data);
          setUsersFound(response);
        })
        .catch(err => console.log(err));
    }
  }, [searchUser]);

  const SearchForUser = function(event) {
    setSearchUser(event.target.value);
  };

  return (
    <>
      <div className="chat-container">
        <div className="top-bar">
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
        </div>
      </div>
    </>
  );
}