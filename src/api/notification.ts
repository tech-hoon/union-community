import { dbService, firebaseApp } from 'service/firebase';

export const sendMessage = async (
  recieverUid: string,
  senderUid: string,
  text: string,
  created_at: number,
  is_secret: boolean
) => {
  const notification = {
    type: 'message',
    text,
    created_at,
    sender: dbService.doc(`users/${senderUid}`),
    is_secret,
  };

  await dbService.doc(`users/${recieverUid}`).update({
    notification_list: firebaseApp.firestore.FieldValue.arrayUnion(notification),
  });
};

// export const getMyNotification = (uid: string) => {
//   dbService.collection(`users/${uid}`).onSnapshot(async (snapshot) => {
//     await Promise.all(
//       snapshot.docs.map(async (doc) => {
//         const newItem = doc.data();
//         const userData = await newItem.senderId.get();

//         return { ...newItem, sender: userData.data() };
//       })
//     );
//   });
// };
