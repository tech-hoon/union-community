import { getMyLikes, getMyPosts } from 'api/user';
import { selector } from 'recoil';
import { LoginUserType } from 'types';
import { loginUserState } from './loginUser';

export const myPostsState = selector({
  key: 'posts/myPosts',
  dangerouslyAllowMutability: true,
  get: async ({ get }) => {
    const loginUser = get(loginUserState) as LoginUserType;
    const posts = await getMyPosts(loginUser.uid);
    return posts;
  },
});

export const myLikesState = selector({
  key: 'posts/myLikes',
  dangerouslyAllowMutability: true,
  get: async ({ get }) => {
    const loginUser = get(loginUserState) as LoginUserType;
    const posts = await getMyLikes(loginUser.uid);
    return posts;
  },
});
