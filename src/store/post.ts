import { atom, AtomOptions, selector, selectorFamily } from 'recoil';
import { PostType } from 'types';

import { getAllPosts, getPostsByCategory, getPostDetail } from 'api/post';

interface IgetPostsParams {
  lastIndex: number;
  category?: string;
}

export const postsState = atom<PostType[]>({
  key: 'posts',
  default: [],
});

export const postsCategoryState = atom<string>({
  key: 'posts/category',
  default: '',
});

export const postsSelector = selectorFamily<any, any>({
  key: 'postsSelector',
  get:
    ({ category, lastIndex }: IgetPostsParams) =>
    async () =>
      category ? await getPostsByCategory({ lastIndex, category }) : getAllPosts({ lastIndex }),
});

export const postState = atom<any>({
  key: 'post/detail',
  default: {},
});

export const postDetailSelector = selectorFamily<any, any>({
  key: 'postSelector',
  get:
    ({ id }: any) =>
    async () =>
      await getPostDetail(id),
});
