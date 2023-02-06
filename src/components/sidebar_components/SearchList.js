import ChatListItem from './ChatListItem';
import './SearchList.css';

export default function SearchList(props) {
  console.log('Hello from SEARCHLIST COMP USERSFOUND STATE', props.usersFound)

  const listOfSearchedUsers = props.usersFound.map((searchedUsersObj) => {

    return (
      <ChatListItem 
      
      />
    )
  })

  return (
    <div className="search-list-container">
    <ul>
      {/* {listOfChats} */}
    </ul>
    </div>


  );
}