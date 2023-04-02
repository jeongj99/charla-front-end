import "./ChatListItem.css";

export default function ChatListItem(props) {
  //If there is no props.convoID present, that means we are clicking on chat list item from search list and thus want to eihter: Start a new convo OR open an existing conversation we previously closed.
  // else {
  //   axios.get('api/getthenewconversation', {
  //     params: {
  //       contactid: props.contactID //This contact ID of user you clicked on is passed down from the search list to chat list item component.
  //     }
  //   })
  //     .then(response => {
  //       newConvoID = response.data.rows[0];
  //       //If the convoID from the get request is null, this means no convo exists between you and this user. So we are going to make a post request to start a new conversation with this indivdual. 
  //       if (!newConvoID) {

  //         // COMMENT OUT FOR NOW TO DO SOCKET LOGIC!!!!!! REMOVE COMMENT IF YOU WANT TO USE AXIOS LOGIC BACK
  //         // axios.post('api/newconversation', {
  //         //   contactid: props.contactID, //Send over the contact ID of the selected user to the back end, will create new convo in DB between this ID and logged in user ID.
  //         //   firstName: props.firstName, //Send over first name and last name in order to insert into intro message addressing who you started convo with.
  //         //   lastName: props.lastName
  //         // })
  //         //   .then(response => {
  //         //     getTheNewlyCreatedConversation(); //This function will now GET the conversation that was just created (POST) between selected user and logged in user. We pass it the ID of the contact we are starting convo with.
  //         //     newConvoID = "";
  //         //   })
  //         //   .catch(err => console.log(err));

  //         //COMMENT OUT IF YOU WANT TO USE AXIOS LOGIC DO NOT DELETE
  //         socket.emit("new_convo", {
  //           contactid: props.contactID,
  //           firstName: props.firstName,
  //           lastName: props.lastName
  //         }, ({ error, done, data }) => {
  //           if (done) {
  //             navigate(`/chat/${data.id}`);
  //             setSearchUser("");
  //             newConvoID = "";
  //             return;
  //           }
  //           console.log(error);
  //         });
  //       } else {
  //         axios.get('api/amipresent', {
  //           params: {
  //             convoID: newConvoID
  //           }
  //         })
  //           .then(response => {
  //             const amIPresent = response.data;

  //             console.log(amIPresent);

  //             if (amIPresent) {
  //               console.log(amIPresent);
  //               navigate(`/chat/${amIPresent.conversation_id}`);
  //             } else {
  //               axios.post('api/addloggedinuserbacktoconvo', {
  //                 convoID: newConvoID
  //               })
  //                 .then(response => {
  //                   navigate(`/chat/${newConvoID.conversation_id}`);
  //                   setSearchUser("");
  //                   newConvoID = "";
  //                 })
  //                 .catch(err => console.log(err));
  //             }
  //           })
  //           .catch(err => console.log(err));
  //       }
  //     });
  // }
  // };

  return (
    <main className="chat-list-item-container" onClick={() => props.navigateToChat(props.convoID)}>
      <div className="chat-list-item-user-photo-container">
        <img className="chat-list-item-user-photo" alt='profile-pic' src={props.profilePic} />
      </div>
      <div className="chat-list-item-conversation">
        <h3>{props.firstName} {props.lastName}</h3>
        {
          props.profileID === props.messageOwnerID || props.messageOwnerID === 5 ? <p>{props.message}</p> : <p>You: {props.message}</p>
        }
      </div>
      <i className='fa-solid fa-xmark' onClick={event => props.removeYourselfFromConvo(event, props.convoID)}></i>
    </main>
  );
}