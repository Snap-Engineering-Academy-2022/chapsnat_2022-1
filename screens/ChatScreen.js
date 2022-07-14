import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import 'react-native-gesture-handler';
import db from "../firebase";
import { collection, getDocs, doc, updateDoc, setDoc, arrayUnion, onSnapshot } from 'firebase/firestore';

export default function App() {

  const [messages, setMessages] = useState([]);

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
      inverted={true}
      placeholder="type message here!"
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});




