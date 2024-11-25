import TextInput from '@/components/shared/TextInput';
import Spacing from '@/components/shared/Spacing';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';

import { SignupStep1Props } from './SignupInter';
import {
  checkPasswordValidity,
  handlePasswordChange,
  handlePasswordConfirmChange,
  checkUserIdAvailability,
} from './SiginupFunc';

import { useEffect, useState } from 'react';

// 만들려는 계정에 대한 정보
function SignupStep1({
  userId,
  password,
  passwordConfirm,
  setUserId,
  setPassword,
  setPasswordConfirm,
  onNext,
}: SignupStep1Props) {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState<string | null>(null);
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null); // 중복 체크 결과 상태

  useEffect(() => {
    const isFormValid =
      userId &&
      password &&
      passwordConfirm &&
      !passwordError &&
      !confirmError &&
      password === passwordConfirm &&
      isIdAvailable === true; // 아이디 중복 체크 결과가 true여야 함

    setIsButtonDisabled(!isFormValid);
  }, [
    userId,
    password,
    passwordConfirm,
    passwordError,
    confirmError,
    isIdAvailable, // isIdAvailable을 포함
  ]);

  const handleIdCheck = async () => {
    if (!userId) {
      setIdCheckMessage('아이디를 입력해주세요.');
      return;
    }

    setIsCheckingId(true);
    setIdCheckMessage(null);
    try {
      const isAvailable = await checkUserIdAvailability(userId);
      setIsIdAvailable(isAvailable); // 중복 체크 결과 저장
      if (isAvailable) {
        setIdCheckMessage('사용 가능한 아이디입니다.');
      } else {
        setIdCheckMessage('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      setIdCheckMessage('아이디 중복 체크 중 오류가 발생했습니다.');
      setIsIdAvailable(false);
    } finally {
      setIsCheckingId(false);
    }
  };

  return (
    <div>
      <TextInput
        icon={MdOutlineAlternateEmail}
        placeholder='아이디'
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
          setIsIdAvailable(null); // 아이디 입력 시 중복 체크 초기화
        }}
      />
      <div className='flex justify-end mt-2'>
        <button
          onClick={handleIdCheck}
          className='bg-secondary text-white p-2 rounded w-1/2'
          disabled={isCheckingId}
        >
          {isCheckingId ? '확인 중...' : '아이디 중복 체크'}
        </button>
      </div>
      {idCheckMessage && (
        <p
          className={`pl-7 text-sm mt-1 text-end ${
            idCheckMessage === '이미 사용 중인 아이디입니다.'
              ? 'text-red'
              : 'text-blue'
          }`}
        >
          {idCheckMessage}
        </p>
      )}
      <Spacing size={10} />
      <TextInput
        icon={IoLockClosedOutline}
        placeholder='비밀번호'
        type='password'
        value={password}
        onChange={(e) =>
          handlePasswordChange(
            e,
            setPassword,
            setPasswordError,
            checkPasswordValidity,
          )
        }
      />
      {passwordError && (
        <p className='pl-7 text-red text-sm'>{passwordError}</p>
      )}
      <Spacing size={10} />
      <TextInput
        icon={IoLockClosedOutline}
        placeholder='비밀번호 확인'
        type='password'
        value={passwordConfirm}
        onChange={(e) =>
          handlePasswordConfirmChange(
            e,
            password,
            setPasswordConfirm,
            setConfirmError,
          )
        }
      />
      {confirmError && <p className='pl-7 text-red text-sm'>{confirmError}</p>}
      <Spacing size={10} />

      <button
        onClick={onNext}
        className={`bg-primary text-white p-2 rounded-xl absolute left-5 right-5 bottom-8 ${
          isButtonDisabled ? 'opacity-25' : ''
        }`}
        disabled={isButtonDisabled}
      >
        다음
      </button>
    </div>
  );
}

export default SignupStep1;
