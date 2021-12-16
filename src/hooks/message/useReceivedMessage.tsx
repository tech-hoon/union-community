import useLocalStorage from 'hooks/common/useLocalStorage';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import { receivedMessageState } from 'store/message';
import { LoginUserType } from 'types';

const useReceivedMessage = () => {
  const { uid } = useRecoilValue(loginUserState) as LoginUserType;
  const [messages, setMessages] = useRecoilState(receivedMessageState);
  const [receivedMessageCount, setReceivedMessageCount] = useLocalStorage(
    'received_message_count',
    0
  );

  let unsubscribe = () => {};

  const onLoadReceivedMessage = () => {
    if (uid) {
      unsubscribe = dbService.doc(`users/${uid}`).onSnapshot(async (snapshot) => {
        const res: any = snapshot.data();
        const messages: any[] = res.received_message_list;
        const newMessages: any = await Promise.all(
          messages.map(async (message) => {
            const { uid, avatar_id, nickname } = (await message.user.get()).data();

            return {
              ...message,
              user: { uid, avatar_id, nickname },
            };
          })
        );

        // if (newNotif.length !== 0 && newNotif.length !== notificationCount) {
        //   setNotificationCount(newNotif.length);
        //   setHasNewNotification(true);
        // }

        setMessages(newMessages.reverse());
      });
    }
  };

  const onDeleteMessage: React.MouseEventHandler<HTMLElement> = (e) => {
    const targetId = (e.target as HTMLElement).id;
    const newArray = [];

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === targetId) {
        continue;
      }
      newArray.push({ ...messages[i], user: dbService.doc(`users/${uid}`) });
    }

    dbService.doc(`users/${uid}`).update({
      received_message_list: newArray,
    });
  };

  const onDeleteAllMessages = () => {
    dbService.doc(`users/${uid}`).update({
      received_message_list: [],
    });
  };

  useEffect(() => {
    onLoadReceivedMessage();
    return () => unsubscribe();
  }, []);

  return {
    messages,
    onDeleteMessage,
    onDeleteAllMessages,
  };
};

export default useReceivedMessage;
