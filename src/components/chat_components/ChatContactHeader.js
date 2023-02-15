import { useState } from 'react';
import './ChatContactHeader.css'

export default function ChatContactHeader(props) {
  const { chatListState, id } = props;
  const [contactInfoForHeader, setContactInfoForHeader] = useState("") //This state will hold the contact object that matches the current ID/ChatListItem selected

  if (!chatListState) {
    return;
  } else {
    for (const contactObject of chatListState.data) {
      console.log('Hello from your contact object that should match the id you are on', typeof contactObject)
      console.log('Hello from your ID PARAMS IN THE HEADER', typeof Number(id))
      if (contactObject.contact.id === Number(id)) {
        // setContactInfoForHeader(contactObject.contact)
        (console.log('converting ID to number worked and it now matches id in object'))
      }
    }
  }

  // console.log('Hello from all the info inside your chat contact header', chatListState.data)

  return (
    <div className="chat-contact-header">
    
  </div>
  );
}