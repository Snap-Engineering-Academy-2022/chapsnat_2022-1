import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";
import { doc, onSnapshot, arrayUnion, updateDoc } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Text } from "react-native";


export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

  console.log("userData!!!!!!!!!!!!", userData);
  // console.log("username please", userData.name)

    useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
      console.log("New Snapshot! ", snapshot.data().messages);
      setMessages(snapshot.data().messages);
    });
  
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback(async (messages = []) => {
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0])
    });
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);


 if(user && userData) { return ( 
<>
    {console.log(user, "testing chatsreen")}
    {console.log(userData, "testing chatsreen")}
    {/* <Text>LOADED</Text> */}


    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: user.uid,
        // name: {userData},
        // avatar: "https://placeimg.com/140/140/any",
          name: userData.name,

        // userData
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
</>
  );
  }
  else {
    return <Text>Loading</Text>
  }
}

