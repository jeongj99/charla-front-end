import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../api/axios";
import "./Chat.css";
import { SiXdadevelopers } from "react-icons/si";
import SideBarSearch from '../components/sidebar_components/SideBarSearch';
import ChatList from '../components/sidebar_components/ChatList';
import SearchList from '../components/sidebar_components/SearchList';
import ChatInput from '../components/chat_components/ChatInput';

export default function Chat() {
  const { id } = useParams(); //Refers to the /ID in the URL, will be set by UseNavigate in ChatListItem
  const [searchUser, setSearchUser] = useState(""); //State for searching a user in search bar
  const [usersFound, setUsersFound] = useState(""); //State for response of searched user
  const [convoMessages, setConvoMessages] = useState("") //This state holds all the messages for the selected Chat List Item.

  useEffect(() => {
    if (id) {
      axios.get('api/chat', {
        params: {
          id: id
        }
      })
        .then(response => {
          console.log('Hello from axios fro NEW CONVERSATION', response.data);
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
            </div>
          </aside>
          <section className="chat">
            <div className="chat-message">
              <h2>This is chat page and there is no id</h2>
            </div>
            <ChatInput />
          </section>
        </div>
      </div>
    </>
  );
}