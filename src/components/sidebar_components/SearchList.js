import ChatListItem from './ChatListItem';
import './SearchList.css';

export default function SearchList(props) {
  console.log('Hello from SEARCHLIST COMP USERSFOUND STATE', props.usersFound)

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