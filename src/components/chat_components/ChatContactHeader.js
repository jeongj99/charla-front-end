import { useState } from 'react';
import './ChatContactHeader.css'

export default function ChatContactHeader(props) {
  const { chatListState, id } = props;
  let contactInfoVariable = "";
  // const [contactInfoForHeader, setContactInfoForHeader] = useState("") //This state will hold the contact object that matches the current ID/ChatListItem selected

  if (!chatListState) {
    return;
  } else {
    for (const contactObject of chatListState.data) {
      // console.log('Hello from your contact objects conversation id', contactObject.conversation_id)
      if (contactObject.conversation_id === Number(id)) {
        // console.log('This is the contact object that matched params id', contactObject.conversation_id, id)
        contactInfoVariable = contactObject.contact;
        // (console.log('converting ID to number worked and it now matches id in object'))
      }
    }
  }

  console.log('HELLO FROM YOUR NEW VARIABLE SIR', contactInfoVariable)


  // console.log('Hello from all the info inside your chat contact header', chatListState.data)

  return (
    <div className="chat-contact-header">
      {contactInfoVariable.first_name} {contactInfoVariable.last_name}
  </div>
  );
}