import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/user';

function handleLogout() {
  const setUser = useSetRecoilState(userState); // Recoil 상태 업데이트 함수

  setUser({
    isLoggedIn: false,
    userId: null,
    role: null,
  });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  window.location.href = '/auth/login';
}

export default handleLogout;
