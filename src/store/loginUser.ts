import { atom, selector } from 'recoil';
import { loginUserType } from 'types';

export const loginUserState = atom<loginUserType>({
  key: 'login_user',
  default: {
    name: '',
    nickname: '',
    email: '',
    uid: '',
    avatarId: 1,
  },
});

export const loginStatus = selector({
  key: 'isLoggedIn',
  get: ({ get }) => isEmpty(get(loginUserState)),
});

const isEmpty = ({ name, nickname, email, uid, avatarId }: loginUserType) => {
  return !!(name && nickname && email && uid && avatarId);
};
