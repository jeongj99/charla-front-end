import "./SideBarSearch.css"

export default function SideBarSearch(props) {

  return (
    <div className="sidebar-search-container">
      <input type="text" placeholder="Search..."/>
        <a href="#">
        <i class="fa-solid fa-magnifying-glass"></i>
        </a>
  </div>
  );
}