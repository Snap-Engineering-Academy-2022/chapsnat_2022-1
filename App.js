import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import db from "./firebase";
import { collection, getDocs } from 'firebase/firestore';

export default function App() {

  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   db.collection("Chats")
  //     .doc("myfirstchat")
  //     .get()
  //     .then((snapshot) => {
  //       console.log(snapshot.id);
  //       console.log(snapshot.data());
  //     });
  // }, []);


  useEffect(() => {
    async function getChat() {
      console.log("starting get!")
      const chatsCol = collection(db, 'Chats');
      const chatsDoc = await getDocs(chatsCol);
      const chatData = chatsDoc.docs.map(doc => doc.data());
      console.log("here chatData", chatData);
      setMessages(chatData[0].messages);
    }

    getChat();
  }, []);


  useEffect(() => {

    setMessages(history.reverse())
  }, [])

  let history = [
    {
      _id: 1,
      text: 'Hello Bull',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Poco',
        avatar: 'https://static.wikia.nocookie.net/brawlstars/images/2/24/Poco_Skin-Default.png/revision/latest?cb=20211112215606',
      },
    },
    {
      _id: 1,
      text: 'How it goes',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Poco',
        avatar: 'https://static.wikia.nocookie.net/brawlstars/images/2/24/Poco_Skin-Default.png/revision/latest?cb=20211112215606',
      },
    },

    {
      _id: 3,
      text: 'Goodbye',
      createdAt: new Date(),
      user: {
        _id: 4,
        name: 'Bull',
        avatar: 'https://static.wikia.nocookie.net/brawlstars/images/b/b7/Bull_Skin-Default.png/revision/latest/scale-to-width-down/1200?cb=20210913081903',
      },
    },
  ]

  const onSend = useCallback((messages = []) => {
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
