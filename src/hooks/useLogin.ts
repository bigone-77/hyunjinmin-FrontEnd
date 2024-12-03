import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/user'; // Recoil 상태
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const [error, setError] = useState(''); // 에러 상태
  const setUser = useSetRecoilState(userState); // Recoil 상태 업데이트 함수
  const navigate = useNavigate();

  const login = async (userId: string, password: string) => {
    try {
      const response = await axios.post('/systemMng/user/login', {
        USER_ID: userId,
        PASSWORD: password,
      });

      if (response.data.status === 'success') {
        const { accessToken, USER_ID, USER_ROLE } = response.data;
        localStorage.setItem('accessToken', accessToken); // 토큰 저장

        // Recoil 상태 업데이트
        setUser({
          isLoggedIn: true,
          userId: USER_ID,
          role: USER_ROLE,
        });

        // 페이지 이동
        if (USER_ROLE === 'USER_T') {
          navigate('/manager'); //window.href로 이동시 recoil 상태가 초기화 되어 userId값이 없어짐
        } else {
          navigate('/');
        }
      } else {
        setError(response.data.msg); // 서버에서 온 에러 메시지
      }
    } catch (error) {
      setError('로그인에 실패했습니다. 다시 시도해 주세요.'); // 기본 에러 메시지
      console.error('Login error:', error);
    }
  };

  return { login, error };
}

export default useLogin;
