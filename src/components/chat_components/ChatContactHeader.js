import './ChatContactHeader.css';

export default function ChatContactHeader({ contactInfo, showChat }) {
  return (
    <div className={showChat ? "chat-contact-header-container-mobile" :"chat-contact-header-container"}>
      <div className='chat-contact-header-contact-image-container'>
        <img className='chat-contact-header-contact-image' alt='profile-pic' src={contactInfo.profilePhotoUrl}></img>
      </div>
      <div className='chat-contact-header-contact-name'>
        {contactInfo.firstName} {contactInfo.lastName}
      </div>
    </div>
  );
}