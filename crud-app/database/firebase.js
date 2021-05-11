import firebase from 'firebase'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyAqyqEw3McYxOR26HJbX4Ndph276PzmlUU",
    authDomain: "crud-rn-92b05.firebaseapp.com",
    projectId: "crud-rn-92b05",
    storageBucket: "crud-rn-92b05.appspot.com",
    messagingSenderId: "954618297859",
    appId: "1:954618297859:web:f43d7dd343d0b7d126d836"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default {
    firebase,
    db
}