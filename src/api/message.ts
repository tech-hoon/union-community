import { dbService, firebaseApp } from 'service/firebase';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (
  receiverUid: string,
  senderUid: string,
  text: string,
  created_at: number,
  is_secret: boolean
) => {
  const message = {
    id: uuidv4().slice(0, 8),
    type: 'message',
    text,
    created_at,
    is_secret,
  };

  await dbService.doc(`users/${receiverUid}`).update({
    received_message_list: firebaseApp.firestore.FieldValue.arrayUnion({
      ...message,
      user: dbService.doc(`users/${senderUid}`),
    }),
  });

  await dbService.doc(`users/${senderUid}`).update({
    sent_message_list: firebaseApp.firestore.FieldValue.arrayUnion({
      ...message,
      user: dbService.doc(`users/${receiverUid}`),
    }),
  });
};
