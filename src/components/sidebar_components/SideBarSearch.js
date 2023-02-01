import "./SideBarSearch.css"

export default function SideBarSearch(props) {

  return (
    <div className="sidebar-search-container">
      <input type="text" placeholder="Search..."/>
        <a href="#">
          <i className="fas fa search"></i>
        </a>
  </div>
  );
}