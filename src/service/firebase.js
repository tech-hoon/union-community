import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: 'univ-dorm-community.appspot.com',
  // messagingSenderId: '733669720752',
};

const app = initializeApp(firebaseConfig);
export default app;
