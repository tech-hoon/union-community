import { VAPID_KEY } from 'utils/config';
import { messageService } from './firebase';

export const handlePushToken = async () => {
  try {
    const currentToken = await messageService.getToken({ vapidKey: VAPID_KEY });
    return currentToken;
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messageService.onMessage((payload) => {
      resolve(payload);
    });
  });
