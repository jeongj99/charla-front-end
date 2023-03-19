import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ChatInput.css";

export default function ChatInput(props) {
  const [userMessage, setUserMessage] = useState(""); //This state holds the current user Message being typed and represents what is being seen on the textarea value
  const [messageSubmitted, setMessageSubmitted] = useState(""); //This state confirms whether a messaege has been submitted via clicking the enter button
  const [missingParticipantSuccesffulyAddedBack, setMissingParticipantSuccessfullyAddedBack] = useState("") //This state is triggered to a value/activated once a response returns from successfully adding participant back to convo

  const userMessageInput = function(event) {
    setUserMessage(event.target.value);
    console.log(userMessage);
  };

  const handleKeyDown = function(event) {
    //If message is length or message lenth is 0 and enter is hit, use event prevvent default to stop a space (which is a not null value) to be entered and don't allow submission of message.
    if ((!userMessage || userMessage.length === 0) && event.key === 'Enter') {
      event.preventDefault();
      return;
    }
    if (userMessage === " ") {
      return;
    }
    if (event.key === 'Enter') {
      setMessageSubmitted('Message Submitted');
      // setUserMessage("")
      console.log('Handle Key down was executed');
    } else {
      return;
    }
  };

  /////////////////Helper Function - Is passed the conversation name and returns the contact IDS within the name in an array
  const getContactIDFromConvoName = (conversationName) => {

    let wholeConversationName = conversationName.split(' ');

    let contactID1 = wholeConversationName[3];
    let contactID2 = wholeConversationName[5];

    //In the future should ensure that array that is returned is in numerical order from lowest to highest, that way can save some code down the line
    return [contactID1, contactID2];

  };

  //If enter button clicked, we change messageSubmitted state and trigger axios post request.
  useEffect(() => {
    if (messageSubmitted === 'Message Submitted') {

      //Upon message submitted state being properly updated we first make a get request to check that both individuals are present within the conversation before sending a new message.
      axios.get('api/participantspresent', {
        params: {
          convoID: props.convoID
        }
      })
        .then(response => {
          let loggedInUserID = response.data.loggedInUserID;
          let firstParticipant = response.data.rows[0]; //Participant one will represent the logged in user, matches loggedinuserID
          let secondParticipant = response.data.rows[1]; //Participant two will represent the contact the logged in user is speaking with

          //If the second participant is undefined, this means the contact you are starting a convo with left the conversation, so we need to add them back. First do axios get request to get the contact ID of the person you are speaking with. 
          if (!secondParticipant) {
            //This axios request will return one conversation name
            axios.get('api/useconvoIDtogetcontactID', {
              params: {
                convoID: props.convoID
              }
            })
              .then(response => {
                //Use helper function to extract IDS from conversation name and store in own respective variables. Also ensure we convert these to a number upn return
                let contact1 = Number(getContactIDFromConvoName(response.data.rows[0].conversation_name)[0]);
                let contact2 = Number(getContactIDFromConvoName(response.data.rows[0].conversation_name)[1]);

                //Check which contact doesn't equal the loggedinuserID, this will be the ID of the individual who has left the convo and thus we will use their ID to add them back to the convo via post request
                if (contact1 !== loggedInUserID) {
                  axios.post('api/addparticipantwholeftbacktoconvo', {
                    contactID: contact1,
                    convoID: props.convoID
                  })
                    .then(response => {
                      secondParticipant = { contact_id: contact1}
                      setMissingParticipantSuccessfullyAddedBack(secondParticipant);
                    })
                    .catch(err => console.log(err));
                }
                if (contact2 !== loggedInUserID) {
                  axios.post('api/addparticipantwholeftbacktoconvo', {
                    contactID: contact2,
                    convoID: props.convoID
                  })
                    .then(response => {
                      secondParticipant = { contact_id: contact2 }
                      setMissingParticipantSuccessfullyAddedBack(secondParticipant);
                    })
                    .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));
          }

          console.log('Hello from secondParticipant after the post request', secondParticipant)

          //Check if BOTH the first participant and second participant are in the convo (not null), and if one of their ids are equal to the loggedinUserID. If so, then loggedInUser is a participant in convo and as a result can send message.
          //IMPORTANT NOTE: Allow this to fire whether it has a value or is null isn't ideal, add fix soon!
          if ((missingParticipantSuccesffulyAddedBack || !missingParticipantSuccesffulyAddedBack) && (firstParticipant.contact_id === loggedInUserID || secondParticipant.contact_id === loggedInUserID)) {
            axios.post('api/messagesubmission', {
              messageSubmitted: userMessage,
              convoID: props.convoID
            })
              .then(response => {
                setUserMessage(""); //Reset states upon response to prepare for next message to be sent
                setMessageSubmitted("");
                props.setRefreshMessages(response.data); //Although response.data empty, this allows for trigger in state refreshMessage state, used to refresh Chat-Messages and ChatListItem component with latest message!
              })
              .catch(err => console.log(err));
          }
          // else {
          //   // If the logged in user did not match any of the returning participants, or if one of the values is null, then we post request to add the logged in user as participant back to the convo, and then once they are added back, make same post request for message submission.
          //   axios.post('api/addparticipantbacktoconvo', {
          //     convoID: props.convoID
          //   })
          //     .then(response => {
          //       axios.post('api/messagesubmission', {
          //         messageSubmitted: userMessage,
          //         convoID: props.convoID
          //       })
          //         .then(response => {
          //           setUserMessage(""); //Reset states upon response to prepare for next message to be sent
          //           setMessageSubmitted("");
          //           props.setRefreshMessages(response.data); //Although response.data empty, this allows for trigger in state refreshMessage state, used to refresh Chat-Messages and ChatListItem component with latest message!
          //         })
          //         .catch(err => console.log(err));
          //     })
          //     .catch(err => console.log(err));
          // }
        })
        .catch(err => console.log(err));
    }
  }, [messageSubmitted]);


  return (
    <>
      {
        props.convoID ? <textarea className="text-area" value={userMessage} placeholder="Start a Charla!" onChange={userMessageInput} onKeyDown={handleKeyDown} maxLength="2000"></textarea> : <textarea disabled value={userMessage} className="text-area-disabled"></textarea>
      }
    </>
  );
}