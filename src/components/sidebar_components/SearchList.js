import SearchListItem from './SearchListItem';

import './SearchList.css';

export default function SearchList({ searchedUsers, searchListItemOnClick, displayChat }) {
  const listOfSearchedUsers = searchedUsers.map((searchedUser) => {
    return (
      <SearchListItem
        key={searchedUser.id}
        contactID={searchedUser.id}
        firstName={searchedUser.first_name}
        lastName={searchedUser.last_name}
        profilePic={searchedUser.profile_photo_url}
        searchListItemOnClick={searchListItemOnClick}
      />
    );
  });

  return (
    <div className="search-list-container">;
      <ul onClick={displayChat}>
        {listOfSearchedUsers}
      </ul>
    </div >
  );
}
