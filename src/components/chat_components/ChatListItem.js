import "./ChatListItem.css"

export default function ChatListItem(props) {

  return (
    <main className="chat-list-item-container">
      <img className="chat-list-item-user-photo" src="https://ouch-cdn2.icons8.com/HVpVN0Xu75AqsHQ0S7oIwHtbSiwb1pPSkGzQadwHuZo/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNDk5/Lzk3ODhkMjhiLWZj/NmMtNGYxNS05OTBl/LTkyNTc5Y2VlZmIw/MS5zdmc.png"/>
      <div className="chat-list-item-conversation">You: This is a test conversation to see how a conversation would look within the ChatListItem component.</div>
    </main>

  );

}