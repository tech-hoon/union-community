import { atom } from 'recoil';
import { LoginUserType, RegisterDataType } from 'types';

export const loginUserState = atom<LoginUserType | null>({
  key: 'login_user',
  default: null,
});

export const registerDataState = atom<RegisterDataType | null>({
  key: 'register_input',
  default: null,
});
