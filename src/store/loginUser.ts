import { atom } from 'recoil';
import { loginUserType } from 'types';

export const loginUserState = atom<loginUserType | null>({
  key: 'login_user',
  default: null,
});
