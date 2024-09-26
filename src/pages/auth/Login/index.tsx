import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';

import loginBg from '@/assets/svgs/bg-login.svg';
import TextInput from '@/components/shared/TextInput';
import Spacing from '@/components/shared/Spacing';
import Button from '@/components/shared/Button';

function LoginPage() {
  return (
    <div className='pt-10'>
      <img src={loginBg} alt='login-bg' className='mx-auto' />

      <div className='my-8'>
        <p className='text-2xl text-black'>로그인</p>

        <Spacing size={12} />

        <TextInput icon={MdOutlineAlternateEmail} placeholder='이메일' />

        <Spacing size={16} />

        <TextInput icon={IoLockClosedOutline} placeholder='비밀번호' />

        <Spacing size={10} />

        <p className='font-semibold text-primary text-end'>
          비밀번호를 잊으셨나요?
        </p>

        <Spacing size={10} />

        <Button theme='login' onClick={() => {}}>
          로그인
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
