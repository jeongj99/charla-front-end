import "./SearchListItem.css";

export default function SearchListItem(props) {
  return (
    <main className="search-list-item-container" onClick={() => props.searchListItemOnClick(props.contactID)}>
      <div className="search-list-item-user-photo-container">
        <img className="search-list-item-user-photo" alt='profile-pic' src={props.profilePic} />
      </div>
      <div className="search-list-item-conversation">
        <h3>{props.firstName} {props.lastName}</h3>
      </div>
    </main>
  );
}