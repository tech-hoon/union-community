import { atom } from 'recoil';
import { CommentType } from 'types';

export const commentState = atom<CommentType[]>({
  key: 'comments',
  default: [],
  dangerouslyAllowMutability: true,
});
