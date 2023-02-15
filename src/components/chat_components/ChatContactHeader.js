import './ChatContactHeader.css'

export default function ChatContactHeader(props) {
  const { chatListState, id } = props;
  let contactInfoVariable = "";

  if (!chatListState) {
    return;
  } else {
    for (const contactObject of chatListState.data) {
      if (contactObject.conversation_id === Number(id)) {
        contactInfoVariable = contactObject.contact;
      }
    }
  }

  console.log('HELLO FROM YOUR NEW VARIABLE SIR', contactInfoVariable)

  return (
    <div className="chat-contact-header-container">
      {/* <div className='chat-contact-header-contact-image-container'> */}
      {/* { contactInfoVariable.contact.profile_photo_url ? <img className='chat-contact-header-contact-image'></img> : <img className='chat-contact-header-contact-image'></img>} */}
      {/* <img className='chat-contact-header-contact-image'>{contactInfoVariable.contact.profile_photo_url}</img> */}
      {/* </div> */}
      <div className='chat-contact-header-contact-name'>
      {contactInfoVariable.first_name} {contactInfoVariable.last_name}
      </div>
  </div>
  );
}