export function getContactInfoForConvo(state, convoID) {
  if (!convoID) {
    return null;
  }

  if (state.conversations[0]) {
    console.log(state.conversations[0].conversation_id);
  }
}