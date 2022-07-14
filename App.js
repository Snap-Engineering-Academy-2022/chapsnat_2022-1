import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import db from "./firebase";
import { collection, getDocs, doc, updateDoc, setDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';

export default function App() {

  const [messages, setMessages] = useState([]);


  // const chatsRef = doc(db, "Chats");
  // await updateDoc(collectionRef, {
  //   capital: true
  // })


  // useEffect(() => {
  //   async function getChat() {
  //     console.log("starting get!")
  //     const chatsCol = collection(db, 'Chats');
  //     const chatsDoc = await getDocs(chatsCol);
  //     const chatData = chatsDoc.docs.map(doc => doc.data());
  //     console.log("here chatData", chatData);
  //     setMessages(chatData[0].messages);
  //   }

  //   getChat();
  // }, []);

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

    // await updateDoc(doc(db, "Chats", "myfirstchat"), {
    //   messages: arrayRemove(messages[onSend])
    // })

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])


  return (

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: 'Primo',
        avatar: "https://static.wikia.nocookie.net/brawlstars/images/0/04/El_Primo_Skin-Default.png/revision/latest?cb=20200225131129",
      }}
      alwaysShowSend //send button always shows
      renderUsernameOnMessage //show username
      
      showUserAvatar={true} //show personal profile
      // inverted={true}
      placeholder="WASSSSUPPPPP"
    />
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
