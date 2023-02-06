import { useState, useEffect } from 'react';
import axios from "axios";
import "./SideBarSearch.css";

export default function SideBarSearch(props) {

  return (
    <div className="sidebar-search-container">
      <input type="text" placeholder="Search..." value={props.searchUser} onChange={props.SearchForUser} />
      <a href="#">
        <i className="fa-solid fa-magnifying-glass"></i>
      </a>
    </div>
  );
}