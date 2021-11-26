import { atom, selector } from 'recoil';
import { loginUserType } from 'types';

export const loginUserState = atom<loginUserType>({
  key: 'login_user',
  default: {
    name: '',
    nickname: '',
    email: '',
    uid: '',
    avatar_id: 1,
    like_list: [],
    post_list: [],
    created_at: 0,
    updated_at: 0,
  },
});

export const loginStatus = selector({
  key: 'isLoggedIn',
  get: ({ get }) => isEmpty(get(loginUserState)),
});

const isEmpty = ({ name, nickname, email, uid, avatar_id }: loginUserType) => {
  return !!(name && nickname && email && uid && avatar_id);
};
