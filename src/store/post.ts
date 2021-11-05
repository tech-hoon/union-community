import { atom } from 'recoil';
import { PostType } from 'types';
import { PAGE_START } from 'utils/config';

interface IgetPostsParams {
  lastIndex: number;
  category?: string;
}

export const postsState = atom<PostType[]>({
  key: 'posts',
  default: [],
});

export const postsPageIndex = atom<number>({
  key: 'posts/pageIndex',
  default: PAGE_START,
});

export const postsCategoryState = atom<string>({
  key: 'posts/category',
  default: '',
});

export const postsOrderByState = atom<string>({
  key: 'posts/orderBy',
  default: 'created_at',
});

export const postsLastKey = atom<any>({
  key: 'posts/lastKey',
  default: '',
});
