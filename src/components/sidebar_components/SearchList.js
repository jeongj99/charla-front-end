import ChatListItem from './ChatListItem';
import './SearchList.css';

export default function SearchList(props) {
  const { setSearchUser } = props;

  //Map over array of usersFound Response and render a ChatListItem for each user object in array.
  const listOfSearchedUsers = props.usersFound.data?.map((searchedUsersObj) => {
    console.log('Hello from the list of searched users', props.usersFound.data )

    return (
      <ChatListItem 
      key={searchedUsersObj.id}
      contactID={searchedUsersObj.id} //Pass down contact ID so that it can be provided from end to back end when clicking on searched user to start a new conversation with them.
      firstName={searchedUsersObj.first_name}
      lastName={searchedUsersObj.last_name}
      profilePic={searchedUsersObj.profile_photo_url}
      setSearchUser={setSearchUser} //Pass down setSearchUser so that once user searched and chat list item is clicked on, search will be set back to null and allow chat list to be rerendered.
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