import './ChatList.css';
import ChatListItem from "./ChatListItem";

export default function ChatList({ chatList, navigateToChat, removeYourselfFromConvo, displayChat }) {
  const listOfChats = chatList.map(conversation => {

    return (
      <ChatListItem
        key={conversation.conversation_id}
        convoID={conversation.conversation_id} //From each conversation object in the chatListState, we are going to pass down the conversation ID to the Chat List Item component.
        profileID={conversation.otherParticipant.id}
        firstName={conversation.otherParticipant.firstName}
        lastName={conversation.otherParticipant.lastName}
        profilePic={conversation.otherParticipant.profilePhotoUrl}
        messageOwnerID={conversation.lastMessage.senderContactId}
        message={conversation.lastMessage.messageText}
        navigateToChat={navigateToChat}
        removeYourselfFromConvo={removeYourselfFromConvo}
      />
    );
  });

  return (
    <div className="chat-list-container">
      <ul onClick={displayChat}>
        {listOfChats}
      </ul>
    </div>


  );
}