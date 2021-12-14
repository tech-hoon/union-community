import { atom, selector } from 'recoil';
import { PostType } from 'types';
import { getInitialPosts, getMorePosts } from 'api/post';

export const postsState = atom<PostType[]>({
  key: 'posts',
  default: [],
  dangerouslyAllowMutability: true,
});

export const postsCategoryState = atom<string>({
  key: 'posts/category',
  default: '전체',
});

export const postsOrderByState = atom<string>({
  key: 'posts/orderBy',
  default: 'created_at',
});

export const lastVisiblePostState = atom<string>({
  key: 'posts/lastVisible',
  default: '',
  dangerouslyAllowMutability: true,
});

export const getPostsSelector = selector({
  key: 'get/posts',
  get: async ({ get }) => {
    const orderBy = get(postsOrderByState);
    const category = get(postsCategoryState);

    const { data, lastVisiblePost }: any = await getInitialPosts({ orderBy, category });

    return { data, lastVisiblePost };
  },
});

export const getMorePostsSelector = selector({
  key: 'get/more_posts',
  get: async ({ get }) => {
    const orderBy = get(postsOrderByState);
    const category = get(postsCategoryState);
    const lastVisiblePost = get(lastVisiblePostState);

    if (!!lastVisiblePost) {
      const { data, __lastVisiblePost }: any = await getMorePosts({
        orderBy,
        category,
        lastVisiblePost,
      });
      return { data, lastVisiblePost: __lastVisiblePost };
    }
  },
});
