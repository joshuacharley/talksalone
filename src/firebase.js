import firebase from 'firebase';
import 'firebase/storage'


const firebaseApp = firebase.initializeApp({
    apiKey: "YOUR AI KEY",
    authDomain: "/",
    databaseURL: "/",
    projectId: "talk-slaone",
    storageBucket: "/",
    messagingSenderId: "/",
    appId: "/",
    measurementId: "/"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };

