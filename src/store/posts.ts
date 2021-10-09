import { atom, selector } from 'recoil';
import { PostType } from 'types';

export const postsState = atom<PostType[]>({
  key: 'posts',
  default: [],
});

export const postsCategoryState = atom<string>({
  key: 'posts/category',
  default: '',
});
