import { atom, selector } from 'recoil';
import { PostType } from 'types';
import { getInitialPosts, getMorePosts } from 'api/post';

export const postsState = atom<PostType[]>({
  key: 'posts',
  default: [],
});

export const postsCategoryState = atom<string>({
  key: 'posts/category',
  default: '',
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

// export const getPostsSelector = selector({
//   key: 'get/posts',
//   get: async ({ get }) => {
//     const orderBy = get(postsOrderByState);
//     const category = get(postsCategoryState);
//     const lastVisible = get(lastVisiblePostState);
//     const prevPosts = get(postsState);

//     if (!!lastVisible) {
//       console.log('더 불러오긔');
//       const newPosts: any = await getMorePosts({ orderBy, category, lastVisible });
//       return [...prevPosts, ...newPosts];
//     }

//     console.log('처음 불러오기');
//     const posts = await getInitialPosts({ orderBy, category });
//     return posts;
//   },
// });

// export const lastVisibleSelector = selector({
//   key: 'posts/lastVisible',
//   get: ({ get }) => {
//     const posts = get(postsState);
//     return posts[posts.length - 1];
//   },
// });
