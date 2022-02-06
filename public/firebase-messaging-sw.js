/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  apiKey: 'AIzaSyDkmMuC3ioYir0vgSkHvYJDWOeJZT6jOwQ',
  authDomain: 'univ-dorm-community.firebaseapp.com',
  projectId: 'univ-dorm-community',
  storageBucket: 'univ-dorm-community.appspot.com',
  messagingSenderId: '733669720752',
  appId: '733669720752:web:f7e06350e5d6932176f175',
};
firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = '유니온';
    const notificationOptions = {
      body: 'Hello from 유니온',
      icon: '/og-image.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
