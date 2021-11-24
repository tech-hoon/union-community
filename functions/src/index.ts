const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

// export const helloWorld = functions.https.onRequest((request: any, response: any) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

export const postCreated = functions.firestore.document('posts/{postId}').onCreate(() => {
  firestore.doc(`counter/posts`).update({
    count: admin.firestore.FieldValue.increment(1),
  });
});

export const postDeleted = functions.firestore.document('posts/{postId}').onDelete(() => {
  firestore.doc(`counter/posts`).update({
    count: admin.firestore.FieldValue.increment(-1),
  });
});

// export const postViewUp = functions.https.onRequest((request:any, response:any)=>{});
