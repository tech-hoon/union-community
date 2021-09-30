import { atom } from 'recoil';

export const loginStepState = atom({
  key: 'login_step',
  default: 0,
});
