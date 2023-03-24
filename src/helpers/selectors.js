export function getContactInfoForConvo(state, convoID) {
  if (!convoID) {
    return null;
  }

  if (state) {
    const convoInfo = state.conversations.find(convo => convo.conversation_id === +convoID);

    return convoInfo.otherParticipant;
  }
}