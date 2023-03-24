import './ChatContactHeader.css';

export default function ChatContactHeader({ contactInfo }) {
  // const { chatListState, id } = props;
  // let contactHeaderFirstName = "";
  // let contactHeaderLastName = "";
  // let contactHeaderPic = "";

  // if (!chatListState) {
  //   return;
  // } else {
  //   for (const contactObject of chatListState.data) {
  //     if (contactObject.conversation_id === Number(id)) {
  //       contactHeaderFirstName = contactObject.contact.first_name;
  //       contactHeaderLastName = contactObject.contact.last_name;
  //       contactHeaderPic = contactObject.contact.profile_photo_url;
  //     }
  //   }
  // }

  return (
    <div className="chat-contact-header-container">
      <div className='chat-contact-header-contact-image-container'>
        <img className='chat-contact-header-contact-image' alt='profile-pic' src={contactInfo.profilePhotoUrl}></img>
      </div>
      <div className='chat-contact-header-contact-name'>
        {contactInfo.firstName} {contactInfo.lastName}
      </div>
    </div>
  );
}