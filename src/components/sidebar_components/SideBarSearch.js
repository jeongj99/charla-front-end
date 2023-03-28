import { useState, useEffect } from 'react';
import axios from "axios";
import "./SideBarSearch.css";

export default function SideBarSearch({ value, onChange }) {
  return (
    <div className="sidebar-search-container">
      <input type="text" placeholder="Search..." value={value} onChange={event => onChange(event.target.value)} />
      <a href="#">
        <i className="fa-solid fa-magnifying-glass"></i>
      </a>
    </div>
  );
}