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
    residentAuthenticated: false,
    registerDone: false,
  },
});

export const registerStatus = selector({
  key: 'isLoggedIn',
  get: ({ get }) => isValidated(get(loginUserState)),
});

interface IParams {
  residentAuthenticated: boolean;
  nickname: string;
  registerDone: boolean;
}

const isValidated = ({ residentAuthenticated, nickname }: IParams) => {
  return residentAuthenticated && !!nickname;
};
