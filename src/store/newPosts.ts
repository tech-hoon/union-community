import { atom } from 'recoil';

export const postHasUpdatedState = atom<boolean>({
  key: 'posts/hasUpdated',
  default: false,
});
