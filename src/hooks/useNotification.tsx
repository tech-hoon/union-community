import useLocalStorage from 'hooks/common/useLocalStorage';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbService } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import { notificationState, newNotificationState } from 'store/notification';
import { NotificationType, LoginUserType } from 'types';

const useNotification = () => {
  const { uid } = useRecoilValue(loginUserState) as LoginUserType;
  const [notification, setNotification] = useRecoilState(notificationState);
  const [hasNewNotification, setHasNewNotification] = useRecoilState(newNotificationState);
  const [notificationCount, setNotificationCount] = useLocalStorage('notification_count', 0);

  let unsubscribe = () => {};

  const onLoadNotification = () => {
    if (uid) {
      unsubscribe = dbService
        .collection('users')
        .doc(uid)
        .onSnapshot(async (snapshot) => {
          const res: any = snapshot.data();
          const notificationList: any[] = res.notification_list;
          const newNotif: any = await Promise.all(
            notificationList.map(async (item) => {
              const { uid, avatar_id, nickname } = (await item.sender.get()).data();

              return {
                ...item,
                sender: { uid, avatar_id, nickname },
              };
            })
          );

          if (newNotif.length !== 0 && newNotif.length !== notificationCount) {
            setNotificationCount(newNotif.length);
            setHasNewNotification(true);
          }

          setNotification(newNotif.reverse());
        });
    }
  };

  const onDeleteNotification: React.MouseEventHandler<HTMLElement> = (e) => {
    const targetId = (e.target as HTMLElement).id;
    const newArray = [];

    for (let i = 0; i < notification.length; i++) {
      if (notification[i].id === targetId) {
        continue;
      }
      newArray.push({ ...notification[i], sender: dbService.doc(`users/${uid}`) });
    }

    dbService.doc(`users/${uid}`).update({
      notification_list: newArray,
    });
  };

  const onDeleteAllNotification = () => {
    dbService.doc(`users/${uid}`).update({
      notification_list: [],
    });
  };

  useEffect(() => {
    onLoadNotification();
    return () => unsubscribe();
  }, []);

  return {
    notification,
    hasNewNotification,
    setHasNewNotification,
    onDeleteAllNotification,
    onDeleteNotification,
  };
};

export default useNotification;
