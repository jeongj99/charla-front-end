import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../api/axios";

import SideBarSearch from '../components/sidebar_components/SideBarSearch';
import ChatList from '../components/sidebar_components/ChatList';
import SearchList from '../components/sidebar_components/SearchList';
import ChatInput from '../components/chat_components/ChatInput';
import ChatMessages from '../components/chat_components/ChatMessages';
import AuthContext from '../context/AuthProvider';

import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";

export default function Chat() {
  const { id } = useParams(); //Refers to the /ID in the URL, will be set by UseNavigate in ChatListItem
  const [searchUser, setSearchUser] = useState(""); //State for searching a user in search bar
  const [usersFound, setUsersFound] = useState(""); //State for response of searched user
  const [convoMessages, setConvoMessages] = useState(""); //This state holds all the messages for the selected Chat List Item.
  const [userID, setUserId] = useState("") //This state holds the ID of the user who is currently logged in
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      axios.get('api/chat', {
        params: {
          id: id
        }
      })
        .then(response => {
          setConvoMessages(response.data);
          console.log('Hello from Convo Messages STATE', convoMessages);
          setUserId(response.data.id);
          console.log('Hello from USER ID in CHAT', userID);
        })
        .catch(err => console.log(err));
    }
  }, [id]);

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

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout", {});
      setAuth(response.data.auth);
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };

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
            <SideBarSearch searchUser={searchUser} SearchForUser={SearchForUser} />
            {searchUser ? <SearchList usersFound={usersFound} /> : <ChatList />}
            <div className="sidebar-profile">
              Alex Jeong with profile pic
              <button className='logout-button' onClick={logout}>
                <BiLogOut />
              </button>
            </div>
          </aside>
          <section className="chat">
            <ChatMessages userID={userID} convoMessages={convoMessages} />
            <ChatInput convoID={id}/>
          </section>
        </div>
      </div>
    </>
  );
}