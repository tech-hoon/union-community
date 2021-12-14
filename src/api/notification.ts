import { dbService, firebaseApp } from 'service/firebase';

export const sendMessage = async (
  recieverUid: string,
  sender: string,
  message: {
    text: string;
    createdAt: number;
  }
) => {
  const { createdAt, text } = message;

  const notification = {
    type: 'message',
    text,
    createdAt,
    sender,
  };

  await dbService.doc(`users/${recieverUid}`).update({
    notification_list: firebaseApp.firestore.FieldValue.arrayUnion(notification),
  });
};

export const getMyNotification = (uid: string) => {
  dbService.collection(`users/${uid}`).onSnapshot(async (snapshot) => {
    const data = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const newItem = doc.data();
        const userData = await newItem.senderId.get();

        return { ...newItem, sender: userData.data() };
      })
    );
  });
};
