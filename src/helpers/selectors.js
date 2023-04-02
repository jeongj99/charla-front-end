export const getContactInfoForConvo = (state, convoID) => {
  if (!convoID) {
    return null;
  }

  if (state) {
    const convoInfo = state.conversations.find(convo => convo.conversation_id === +convoID);

    return convoInfo.otherParticipant;
  }
};

export const getFilteredConversations = state => {
  if (state) {
    const filteredConvos = state.conversations.filter(conversation => conversation.amIPresent === true);

    return filteredConvos;
  }
};