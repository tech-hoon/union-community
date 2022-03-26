import useLocalStorage from 'hooks/common/useLocalStorage';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbService, firebaseApp } from 'service/firebase';
import { loginUserState } from 'store/loginUser';
import { notificationState, hasNewNotificationState } from 'store/notification';
import { NotificationType, LoginUserType } from 'types';

const useNotification = () => {
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const [notifications, setNotifications] = useRecoilState(notificationState);
  const [hasNewNotification, setHasNewNotification] = useRecoilState(hasNewNotificationState);

  const [notificationCountLS, setNotificationCountLS] = useLocalStorage('notification_count', 0);
  const [hasNewNotificationLS, setHasNewNotificationLS] = useLocalStorage(
    'has_new_notification',
    false
  );

  let unsubscribe = () => {};

  const onFetchNotifications = async (userId: string) => {
    const res: any = await dbService.doc(`users/${userId}`).get();
    const notificationsData: any[] = res.data().notification_list;
    const newNotifications: any = await Promise.all(
      notificationsData.map(async (item) => {
        const userData = (await item.sender.get()).data();

        if (userData) {
          const { uid, avatar_id, nickname } = userData;

          return {
            ...item,
            sender: { uid, avatar_id, nickname },
          };
        }
      })
    );

    const sortedNotification = newNotifications
      .sort((a: NotificationType, b: NotificationType) => b.created_at - a.created_at)
      .filter(Boolean);

    if (notificationCountLS < sortedNotification.length || hasNewNotificationLS) {
      setHasNewNotification(true);
      setHasNewNotificationLS(true);
    }

    setNotificationCountLS(sortedNotification.length);
    setNotifications(sortedNotification);
  };

  const onSubscribeNewMessage = () => {
    unsubscribe = dbService
      .collection(`users`)
      .where(firebaseApp.firestore.FieldPath.documentId(), '==', loginUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'modified') {
            const notificationsData: any[] = change.doc.data().notification_list;
            const newNotifications: any = await Promise.all(
              notificationsData.map(async (notification) => {
                const userData = (await notification.sender.get()).data();

                if (userData) {
                  const { uid, avatar_id, nickname } = userData;
                  return {
                    ...notification,
                    sender: { uid, avatar_id, nickname },
                  };
                }
              })
            );

            const sortedNotifications = newNotifications
              .sort((a: NotificationType, b: NotificationType) => b.created_at - a.created_at)
              .filter(Boolean);

            if (notificationCountLS < sortedNotifications.length) {
              setHasNewNotification(true);
              setHasNewNotificationLS(true);
            }

            setNotifications(sortedNotifications);
          }
        });
      });
  };

  const onDeleteNotification = (e: React.MouseEvent<HTMLElement>, targetUid: string) => {
    e.stopPropagation();

    const targetId = (e.target as HTMLElement).id;
    const newArray = [];

    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].id === targetId) {
        continue;
      }
      newArray.push({ ...notifications[i], sender: dbService.doc(`users/${targetUid}`) });
    }

    dbService.doc(`users/${loginUser.uid}`).update({
      notification_list: newArray,
    });
  };

  const onDeleteAllNotification = () => {
    dbService.doc(`users/${loginUser.uid}`).update({
      notification_list: [],
    });
  };

  useEffect(() => {
    if (!loginUser) return;

    onSubscribeNewMessage();
    return () => {
      unsubscribe();

      if (notifications.length) {
        setNotificationCountLS(notifications.length);
      }
    };
  }, [loginUser]);

  return {
    notifications,
    hasNewNotification,
    setHasNewNotification,
    setHasNewNotificationLS,

    onDeleteAllNotification,
    onDeleteNotification,
    onFetchNotifications,
  };
};

export default useNotification;
