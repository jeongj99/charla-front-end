import SearchListItem from './SearchListItem';

import './SearchList.css';

export default function SearchList({ searchedUsers }) {
  //Map over array of usersFound Response and render a ChatListItem for each user object in array.
  const listOfSearchedUsers = searchedUsers.map(searchedUser => {
    return (
      <SearchListItem
        key={searchedUser.id}
        contactID={searchedUser.id} //Pass down contact ID so that it can be provided from end to back end when clicking on searched user to start a new conversation with them.
        firstName={searchedUser.first_name}
        lastName={searchedUser.last_name}
        profilePic={searchedUser.profile_photo_url}
      />
    );
  });

  return (
    <div className="search-list-container">
      <ul>
        {listOfSearchedUsers}
      </ul>
    </div>


  );
}