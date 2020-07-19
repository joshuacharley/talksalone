import firebase from 'firebase';
import 'firebase/storage'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAThhKtb-e4gTbu29DW5LCVwXJAZRcJ-P0",
    authDomain: "talk-slaone.firebaseapp.com",
    databaseURL: "https://talk-slaone.firebaseio.com",
    projectId: "talk-slaone",
    storageBucket: "talk-slaone.appspot.com",
    messagingSenderId: "1035913102115",
    appId: "1:1035913102115:web:9805fd1c66b02b800a0296",
    measurementId: "G-FK7VGYRZNQ"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };

