import Spacing from '@/components/shared/Spacing';
import loginBg from '@/assets/svgs/bg-login.svg';
import TextInput from '@/components/shared/TextInput';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import Button from '@/components/shared/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RestPasswordPage() {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/systemMng/user/resetPassword', {
        USER_ID: userId,
      });

      if (response.data.status === 'success') {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken); // 토큰 저장
        //여기에서 console.log로 재설정된 비밀번호를 알려줘야됨
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      setError('비밀번호 초기화에 실패했습니다');
      console.error('Login error:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아감
  };

  return (
    <div className='pt-10'>
      <img src={loginBg} alt='login-bg' className='mx-auto' />

      <div className='my-8'>
        <p className='text-2xl text-black'>비밀번호 초기화</p>

        <Spacing size={12} />

        <TextInput
          icon={MdOutlineAlternateEmail}
          placeholder='아이디를 입력해 주세요'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <Spacing size={16} />

        {error && <p className='text-red'>{error}</p>}

        <p className='font-semibold text-primary text-end'>
          * 아이디 분실은 관리선생님에게 문의 해 주세요
        </p>

        <Spacing size={10} />

        <Button theme='login' onClick={handleResetPassword}>
          비밀번호 초기화
        </Button>
        <Spacing size={16} />
        <Button theme='back' onClick={handleBack}>
          뒤로가기
        </Button>
      </div>
    </div>
  );
}

export default RestPasswordPage;
