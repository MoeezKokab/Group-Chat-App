import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAXnouwJ29wjYSfQk38z8vL5X86malFjdc",
    authDomain: "gifted-chat-845ec.firebaseapp.com",
    projectId: "gifted-chat-845ec",
    storageBucket: "gifted-chat-845ec.appspot.com",
    messagingSenderId: "879920746413",
    appId: "1:879920746413:web:c67e91732e7d73a4d9db24"
  };

  let app;

  if(firebase.apps.length === 0){
      
      app = firebase.initializeApp(firebaseConfig)
  }
  else{
      app=firebase.app()
  }

  const db=app.firestore()
  const auth=firebase.auth()
  export {db,auth}