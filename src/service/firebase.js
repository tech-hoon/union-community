import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDkmMuC3ioYir0vgSkHvYJDWOeJZT6jOwQ',
  authDomain: 'univ-dorm-community.firebaseapp.com',
  projectId: 'univ-dorm-community',
  storageBucket: 'univ-dorm-community.appspot.com',
  messagingSenderId: '733669720752',
  appId: '1:733669720752:web:f7e06350e5d6932176f175',
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const Firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default app;
