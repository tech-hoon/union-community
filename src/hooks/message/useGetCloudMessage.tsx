import { useState, useEffect } from 'react';
import { handlePushToken, onMessageListener } from 'service/fcm';

const useGetCloudMessage = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [data, setData] = useState<string>();

  const [hasNotification, setHasNotification] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  onMessageListener()
    .then((payload: any) => {
      setHasNotification(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log('payload', payload);
    })
    .catch((err) => console.log(err));

  useEffect(() => {
    async function tokenFunc() {
      const __data = await handlePushToken();
      setData(__data);
    }

    tokenFunc();
  }, [isTokenFound]);

  return { data, notification, hasNotification };
};

export default useGetCloudMessage;
