import { useState, useEffect } from 'react';
import axios from "axios";
import "./SideBarSearch.css"

export default function SideBarSearch(props) {
  const [searchUser, setSearchUser] = useState("TESTING")

  function SearchForUser(event) {
    setSearchUser(event.target.value)
    console.log(event.target.value)
    console.log('Hello from searchSTATE', searchUser)
  }

  useEffect(() => {
    axios.get('http://localhost:8001/api/searchuser', {
      params: {
        searchedUser: searchUser
      }
    })
      .then(response => {
        console.log('Hello from axios', response.config.params);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="sidebar-search-container">
      <input type="text" placeholder="Search..." value={searchUser} onChange={SearchForUser}/>
        <a href="#">
        <i className="fa-solid fa-magnifying-glass"></i>
        </a>
  </div>
  );
}