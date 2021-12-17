import useLocalStorage from 'hooks/common/useLocalStorage';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authService, dbService, firebaseApp } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import { hasNewReceivedMessageState, receivedMessageState } from 'store/message';
import { LoginUserType, MessageType } from 'types';

const useReceivedMessage = () => {
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const [messages, setMessages] = useRecoilState(receivedMessageState);
  const [hasNewMessage, setHasNewMessage] = useRecoilState(hasNewReceivedMessageState);

  const [messageCountLS, setMessageCountLS] = useLocalStorage('received_message_count', 0);
  const [hasNewMessageLS, setHasNewMessageLS] = useLocalStorage('has_new_message', false);

  let unsubscribe = () => {};

  const onFetchReceivedMessage = async (userId: string) => {
    const res: any = await dbService.doc(`users/${userId}`).get();
    const __messages: any[] = res.data().received_message_list;
    const newMessages: any = await Promise.all(
      __messages.map(async (message) => {
        const { uid, avatar_id, nickname } = (await message.user.get()).data();
        return {
          ...message,
          user: { uid, avatar_id, nickname },
        };
      })
    );
    if (messageCountLS < newMessages.length || hasNewMessageLS) {
      setHasNewMessage(true);
      setHasNewMessageLS(true);
    }
    const sortedMessage = newMessages.sort(
      (a: MessageType, b: MessageType) => b.created_at - a.created_at
    );
    setMessageCountLS(sortedMessage.length);
    setMessages(sortedMessage);
  };

  const onSubscribeNewMessage = () => {
    unsubscribe = dbService
      .collection(`users`)
      .where(firebaseApp.firestore.FieldPath.documentId(), '==', loginUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'modified') {
            const __messages: any[] = change.doc.data().received_message_list;
            const newMessages: any = await Promise.all(
              __messages.map(async (message) => {
                const { uid, avatar_id, nickname } = (await message.user.get()).data();
                return {
                  ...message,
                  user: { uid, avatar_id, nickname },
                };
              })
            );

            if (messageCountLS < newMessages.length) {
              setHasNewMessage(true);
              setHasNewMessageLS(true);
            }

            const sortedMessage = newMessages.sort(
              (a: MessageType, b: MessageType) => b.created_at - a.created_at
            );

            setMessages(sortedMessage);
          }
        });
      });
  };

  const onDeleteMessage = (e: React.MouseEvent<HTMLElement>, targetUid: string) => {
    const targetId = (e.target as HTMLElement).id;
    const newArray = [];

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === targetId) {
        continue;
      }
      newArray.push({ ...messages[i], user: dbService.doc(`users/${targetUid}`) });
    }

    dbService.doc(`users/${loginUser?.uid}`).update({ received_message_list: newArray });
  };

  const onDeleteAllMessages = () => {
    dbService.doc(`users/${loginUser?.uid}`).update({ received_message_list: [] });
  };

  useEffect(() => {
    if (!loginUser) return;

    onSubscribeNewMessage();
    return () => {
      unsubscribe();

      if (messages.length) {
        setMessageCountLS(messages.length);
      }
    };
  }, [loginUser]);

  return {
    messages,
    hasNewMessage,
    setHasNewMessage,
    setHasNewMessageLS,

    onDeleteMessage,
    onDeleteAllMessages,
    onFetchReceivedMessage,
  };
};

export default useReceivedMessage;
