import { dbService, firebaseApp } from 'service/firebase';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (
  recieverUid: string,
  senderUid: string,
  text: string,
  created_at: number,
  is_secret: boolean
) => {
  const notification = {
    id: uuidv4().slice(0, 8),
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
