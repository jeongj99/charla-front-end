import { useState, useEffect } from 'react';
import "./SideBarSearch.css"

export default function SideBarSearch(props) {
  const [searchUser, setSearchUser] = useState(null)

  function SearchForUser(event) {
    setSearchUser(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className="sidebar-search-container">
      <input type="text" placeholder="Search..." onChange={SearchForUser}/>
        <a href="#">
        <i className="fa-solid fa-magnifying-glass"></i>
        </a>
  </div>
  );
}