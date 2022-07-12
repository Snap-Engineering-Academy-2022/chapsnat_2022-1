import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default function App() {

  const [messages, setMessages] = useState([]);

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
        avatar: "https://static.wikia.nocookie.net/brawlstars/images/0/04/El_Primo_Skin-Default.png/revision/latest?cb=20200225131129"
      }}
      alwaysShowSend //send button always shows
      renderUsernameOnMessage //show username
      showUserAvatar={true} //show personal profile
      // inverted={true}
      placeholder="WASSSSUPPPPP"
    />


    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  
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
