import { useState } from 'react';
import './ChatContactHeader.css'

export default function ChatContactHeader(props) {
  const { chatListState, id } = props;
  const [contactInfoForHeader, setContactInfoForHeader] = useState("") //This state will hold the contact object that matches the current ID/ChatListItem selected

    // for (const contactObject of chatListState.data) {
    //   if (contactObject.conversation_id === id) {
    //     setContactInfoForHeader(contactObject)
    //     console.log('Hello from your contact object that should match the id you are on', contactObject)
    //   }
    // }

  console.log('Hello from all the info inside your chat contact header', chatListState.data)

  return (
    <div className="chat-contact-header">
    
  </div>
  );
}