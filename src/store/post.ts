import { atom, AtomOptions, selector, selectorFamily } from 'recoil';
import { PostType } from 'types';
import { FIRST_INDEX } from 'utils/config';

interface IgetPostsParams {
  lastIndex: number;
  category?: string;
}

export const postsState = atom<PostType[]>({
  key: 'posts',
  default: [],
});

export const postsLastIndex = atom<number>({
  key: 'posts/lastIndex',
  default: FIRST_INDEX,
});

export const postsCategoryState = atom<string>({
  key: 'posts/category',
  default: '',
});

export const postsOrderByState = atom<string>({
  key: 'posts/orderBy',
  default: 'created_at',
});
