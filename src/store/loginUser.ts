import { atom, selector } from 'recoil';
import { LoginUserType, RegisterDataType } from 'types';

export const loginUserState = atom<LoginUserType | null>({
  key: 'login_user',
  default: null,
  dangerouslyAllowMutability: true,
});

export const loginStatus = selector<boolean>({
  key: 'is_logged_in',
  get: ({ get }) => get(loginUserState)?.auth_status === 'approved',
});

export const registerDataState = atom<RegisterDataType | null>({
  key: 'register_input',
  default: null,
});
