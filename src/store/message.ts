import { atom } from 'recoil';
import { MessageType } from 'types';

export const sentMessageState = atom<MessageType[] | []>({
  key: 'sent_message',
  default: [],
  dangerouslyAllowMutability: true,
});

export const receivedMessageState = atom<MessageType[] | []>({
  key: 'received_message',
  default: [],
  dangerouslyAllowMutability: true,
});

export const hasNewReceivedMessageState = atom<boolean>({
  key: 'new_message',
  default: false,
});
