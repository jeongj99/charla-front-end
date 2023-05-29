import './ChatContactHeader.css';
import { IoChevronBackSharp } from "react-icons/io5";


export default function ChatContactHeader({ contactInfo, showChat, setShowChat }) {

  /**
   * This function allows the user to go back to the chat list from the chat page by clicking the back sharp button beside the contact header photo (only in mobile)
   */
  const goBackToChatList = () => {
    setShowChat(false);
  };

  return (
    <div className={showChat ? "chat-contact-header-container-mobile" : "chat-contact-header-container"}>
      <IoChevronBackSharp onClick={goBackToChatList} className={"back-to-chat-list"} />
      <div className='chat-contact-header-contact-image-container'>
        <img className='chat-contact-header-contact-image' alt='profile-pic' src={contactInfo.profilePhotoUrl}></img>
      </div>
      <div className="chat-contact-header-contact-name">
        {contactInfo.firstName} {contactInfo.lastName}
      </div>
    </div>
  );
}
