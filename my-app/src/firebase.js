import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDg5Yw8tk20vmivCJlXT5kNLAsQNpNkkoA",
    authDomain: "thanhnam-d6460.firebaseapp.com",
    databaseURL: "https://thanhnam-d6460.firebaseio.com",
    projectId: "thanhnam-d6460",
    storageBucket: "thanhnam-d6460.appspot.com",
    messagingSenderId: "948325163102",
    appId: "1:948325163102:web:86336ea42a68648c5094cf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth=firebase.auth();
  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();
  export default firebase