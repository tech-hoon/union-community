import useLocalStorage from 'hooks/common/useLocalStorage';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import { sentMessageState } from 'store/message';
import { LoginUserType } from 'types';

const useSentMessage = () => {
  const { uid } = useRecoilValue(loginUserState) as LoginUserType;
  const [messages, setMessages] = useRecoilState(sentMessageState);
  const [sentMessageCount, setSentMessageCount] = useLocalStorage('sent_message_count', 0);

  const onLoadSentMessage = async () => {
    if (uid) {
      const res = await dbService.doc(`users/${uid}`).get();
      const data: any = res.data();
      const messages: any[] = data.sent_message_list;
      const newMessages: any = await Promise.all(
        messages.map(async (message) => {
          const { uid, avatar_id, nickname } = (await message.user.get()).data();

          return {
            ...message,
            user: { uid, avatar_id, nickname },
          };
        })
      );

      setMessages(newMessages.reverse());
    }
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

    dbService.doc(`users/${uid}`).update({
      sent_message_list: newArray,
    });
  };

  const onDeleteAllMessages = () => {
    dbService.doc(`users/${uid}`).update({
      sent_message_list: [],
    });
  };

  useEffect(() => {
    onLoadSentMessage();
  }, []);

  return {
    messages,
    onDeleteMessage,
    onDeleteAllMessages,
  };
};

export default useSentMessage;
