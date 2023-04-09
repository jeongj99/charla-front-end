import "./SideBarSearch.css";

export default function SideBarSearch({ value, onChange }) {
  return (
    <div className="sidebar-search-container">
      <input type="text" placeholder="Search..." value={value} onChange={event => onChange(event.target.value)} />
      <i className="fa-solid fa-magnifying-glass" />
    </div>
  );
}