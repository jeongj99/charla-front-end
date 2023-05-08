import "./ChatInput.css";

export default function ChatInput({ convoID, value, onChange, handleKeyDown }) {
  return (
    <div className="chat-input-container">
      <form className="message-form" onSubmit={(event) => event.preventDefault}>
        <textarea
          className="text-area"
          placeholder="Start a Charla!"
          value={value}
          maxLength="2000"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event, convoID)}
        />
      </form>
    </div>
  );
}
