import './ChatContactHeader.css'

export default function ChatContactHeader(props) {
  const { chatListState, id } = props;

  for (let object of chatListState.data) {
    if (object.conversation_id === id) {

    }

  }
  console.log('Hello from all the info inside your chat contact header', chatListState.data)

  return (
    <div className="chat-contact-header">
    
  </div>
  );
}