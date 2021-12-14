import { getUserData } from 'api/user';
import useLocalStorage from 'hooks/common/useLocalStorage';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbService } from 'service/firebase';
import { loginStatus, loginUserState } from 'store/loginUser';
import { notificationState } from 'store/notification';
import { NotificationType, LoginUserType } from 'types';

const useNotification = () => {
  const loginUser = useRecoilValue(loginUserState);
  const [notification, setNotification] = useRecoilState(notificationState);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [notificationLength, setNotificationLength] = useLocalStorage('notification_length', 0);

  let unsubscribe = () => {};

  function loadNotification() {
    if (loginUser)
      unsubscribe = dbService.doc(`users/${loginUser?.uid}`).onSnapshot(async (snapshot) => {
        const res: any = snapshot.data();
        const notificationList: any[] = res.notification_list;
        const newNotif: any = await Promise.all(
          notificationList.map(async (item) => ({
            ...item,
            sender: (await item.sender.get()).data(),
          }))
        );

        if (newNotif.length !== 0 && newNotif.length !== notificationLength) {
          setHasNewNotification(true);
        }

        setNotification(newNotif);
        setNotificationLength(newNotif.length);
      });
  }
  useEffect(() => {
    loadNotification();
    return () => unsubscribe();
  }, []);
  return {
    notification,
    hasNewNotification,
    setHasNewNotification,
  };
};

export default useNotification;
