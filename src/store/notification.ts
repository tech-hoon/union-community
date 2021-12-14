import { atom } from 'recoil';
import { NotificationType } from 'types';

export const notificationState = atom<NotificationType[] | []>({
  key: 'notification',
  default: [],
  dangerouslyAllowMutability: true,
});
