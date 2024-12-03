import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: {
    isLoggedIn: false,
    userId: null,
    role: null,
  },
  effects_UNSTABLE: [persistAtom],
});
