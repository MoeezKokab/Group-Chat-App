import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { auth,db } from './firebase1'
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = (props) => {


    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //   setMessages([
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ])
    // }, [])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            }))
        ))
        return unsubscribe;

    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const {
          _id,
          createdAt,text,user
      }=messages[0]
      db.collection('chats').add({
        _id,createdAt,text,user
      })

    }, [])
  


    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOut}>

                    <AntDesign style={{ marginRight: 10 }} name="logout" size={24} color="black" />
                </TouchableOpacity>),
            headerLeft: () => (<View style={{ marginLeft: 15 ,marginBottom:15,padding:5}}>
                <Avatar
                    size={44}
                    rounded
                    source={{ uri: auth?.currentUser?.photoURL }}
                />

            </View>)


        })


    }, [])
    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            alert('Sign-out successful')
            props.navigation.replace('Login')
        }).catch((error) => {
            // An error happened.
            alert('error')
        })
    }


    return (
        <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name:auth?.currentUser?.displayName,
          avatar:auth?.currentUser?.photoURL
        }}
      />
    )
}

export default Chat

