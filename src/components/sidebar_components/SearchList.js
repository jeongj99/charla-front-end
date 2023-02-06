import ChatListItem from './ChatListItem';
import './SearchList.css';

export default function SearchList(props) {

  //Map over array of usersFound Response and render a ChatListItem for each user object in array.
  const listOfSearchedUsers = props.usersFound.data?.map((searchedUsersObj) => {

    return (
      <ChatListItem 
      key={searchedUsersObj.id}
      firstName={searchedUsersObj.first_name}
      lastName={searchedUsersObj.last_name}
      profilePic={searchedUsersObj.profile_photo_url}
      />
    )
  })

  return (
    <div className="search-list-container">
    <ul>
      {listOfSearchedUsers}
    </ul>
    </div>


  );
}