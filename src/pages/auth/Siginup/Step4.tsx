import TextInput from '@/components/shared/TextInput';
import Spacing from '@/components/shared/Spacing';
import { FaPhone } from 'react-icons/fa';
import { RiParentLine } from 'react-icons/ri';

import { SignupStep4Props } from './SignupInter';
import { handleParentPhoneNumberChange } from '@/pages/auth/Siginup/SiginupFunc';
import { useEffect, useState } from 'react';
import { MdDriveFileRenameOutline } from 'react-icons/md';

// 사용자의 학부모 정보
function SignupStep4({
  userParentName,
  userParentPhoneNumber,
  userParentGB,
  setUserParentName,
  setUserParentPhoneNumber,
  setUserParentGB,
  onPrevious,
  onNext,
}: SignupStep4Props) {
  const [parentPhoneError, setParentPhoneError] = useState<string | null>(null); //전화번호 조건 에러
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); //비밀번호 비활성화

  useEffect(() => {
    // 모든 입력값이 채워지면 버튼 활성화
    if (
      userParentPhoneNumber &&
      userParentGB &&
      !parentPhoneError &&
      userParentName
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [userParentPhoneNumber, userParentGB, parentPhoneError, userParentName]);

  return (
    <div>
      <label className='flex mb-2'>
        <RiParentLine />
        부모 관계
      </label>
      <select
        value={userParentGB}
        onChange={(e) => setUserParentGB(e.target.value)}
        className='p-2 border rounded w-full'
      >
        <option value=''>부모 관계를 선택하세요</option>
        <option value='부'>아버지</option>
        <option value='모'>어머니</option>
      </select>
      <Spacing size={10} />

      <TextInput
        icon={MdDriveFileRenameOutline}
        placeholder='부모님 이름'
        value={userParentName}
        onChange={(e) => setUserParentName(e.target.value)}
      />
      <Spacing size={10} />

      <TextInput
        icon={FaPhone}
        placeholder='부모님 휴대폰 번호'
        value={userParentPhoneNumber}
        onChange={(e) =>
          handleParentPhoneNumberChange(
            e,
            setUserParentPhoneNumber,
            setParentPhoneError,
          )
        }
      />
      {parentPhoneError && (
        <p className='pl-7 text-red text-sm'>{parentPhoneError}</p>
      )}
      <Spacing size={10} />
      <div className='absolute bottom-8 left-0 right-0 flex justify-between'>
        <button
          onClick={onPrevious}
          className='bg-gray-300 p-2 rounded-xl w-[45%] ml-4'
        >
          이전
        </button>
        <button
          onClick={onNext}
          className={`bg-primary text-white p-2 rounded-xl w-[45%] mr-4 ${
            isButtonDisabled ? 'opacity-25' : ''
          }`}
          disabled={isButtonDisabled}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default SignupStep4;
