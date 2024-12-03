import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';

import loginBg from '@/assets/svgs/bg-login.svg';
import TextInput from '@/components/shared/TextInput';
import Spacing from '@/components/shared/Spacing';
import Button from '@/components/shared/Button';
import { useState } from 'react';
import useLogin from '@/hooks/useLogin';

function AdminLoginPage() {
  const { login, error } = useLogin();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    login(userId, password);
  };

  return (
    <div className='pt-10'>
      <img src={loginBg} alt='login-bg' className='mx-auto' />
      <div className='flex justify-center mx-auto'>
        <div className='my-8 w-1/3 h-1/3 border-2 p-10 rounded-xl border-gray-300 shadow-xl'>
          <p className='text-2xl text-black'>관리자 로그인</p>

          <Spacing size={24} />

          <TextInput
            icon={MdOutlineAlternateEmail}
            placeholder='아이디'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <Spacing size={18} />

          <TextInput
            icon={IoLockClosedOutline}
            placeholder='비밀번호'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Spacing size={12} />

          {error && <p className='text-red-500'>{error}</p>}

          <p className='font-semibold text-primary text-end'>
            비밀번호를 잊으셨나요?
          </p>

          <Spacing size={12} />

          <Button theme='login' onClick={handleLogin}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
