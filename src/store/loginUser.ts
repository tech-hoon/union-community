import { atom, selector } from 'recoil';
import { loginUserType } from 'types';

export const loginUserState = atom<loginUserType | null>({
  key: 'login_user',
  default: null,
});

const isEmpty = ({ name, nickname, email, uid, avatar_id }: loginUserType) => {
  return !!(name && nickname && email && uid && avatar_id);
};
