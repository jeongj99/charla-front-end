import './ChatContactHeader.css'

export default function ChatContactHeader(props) {
  const { chatListState, id } = props;
  let contactHeaderFirstName = "";
  let contactHeaderLastName = "";

  if (!chatListState) {
    return;
  } else {
    for (const contactObject of chatListState.data) {
      if (contactObject.conversation_id === Number(id)) {
        contactHeaderFirstName = contactObject.contact.first_name;
        contactHeaderLastName = contactObject.contact.last_name
      }
    }
  }

  // console.log('HELLO FROM YOUR NEW VARIABLE SIR', contactInfoVariable)

  return (
    <div className="chat-contact-header-container">
      {/* <div className='chat-contact-header-contact-image-container'> */}
      {/* { contactInfoVariable.contact.profile_photo_url ? <img className='chat-contact-header-contact-image'></img> : <img className='chat-contact-header-contact-image'></img>} */}
      {/* <img className='chat-contact-header-contact-image'>{contactInfoVariable.contact.profile_photo_url}</img> */}
      {/* </div> */}
      <div className='chat-contact-header-contact-name'>
      {contactHeaderFirstName} {contactHeaderLastName}
      </div>
  </div>
  );
}