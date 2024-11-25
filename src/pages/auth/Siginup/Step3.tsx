import TextInput from '@/components/shared/TextInput';
import Spacing from '@/components/shared/Spacing';
import { FaSchool } from 'react-icons/fa';

import { SignupStep3Props } from './SignupInter';
import { schoolOptions } from '@/utils/getCode';
import {
  handleSchoolChange,
  handleGradeChange,
  updateAge,
} from './SiginupFunc';
import { useEffect, useState } from 'react';

// 사용자의 학교 및 나이 정보
function SignupStep3({
  userSchoolName,
  userSchool,
  userGrade,
  userAge,
  setUserSchoolName,
  setUserSchool,
  setUserGrade,
  setUserAge,
  onPrevious,
  onNext,
}: SignupStep3Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); //비밀번호 비활성화
  const [grade, setGrade] = useState(1); //기본 학년

  useEffect(() => {
    if (userSchool && userSchoolName && userGrade && userAge) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [userSchool, userSchoolName, userGrade, userAge]);

  const generateGradeOptions = (schoolLevel: string) => {
    const maxGrade = schoolLevel === '초' ? 6 : 3;
    return Array.from({ length: maxGrade }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}학년
      </option>
    ));
  };

  return (
    <div>
      <label className='block mb-2'>학교 LEVEL 선택</label>
      <select
        value={userSchool}
        onChange={(e) =>
          handleSchoolChange(
            e,
            setUserSchool,
            (school, grade) => updateAge(school, grade, setUserAge),
            grade,
          )
        }
        className='p-1 border rounded w-full'
      >
        <option value=''>학교 LEVEL을 선택하세요</option>
        <option value='초'>초등학교</option>
        <option value='중'>중학교</option>
        <option value='고'>고등학교</option>
      </select>
      <Spacing size={5} />

      <label className='block mb-2'>학교 선택</label>
      <select
        value={userSchoolName}
        onChange={(e) => setUserSchoolName(e.target.value)}
        className='p-1 border rounded w-full'
        disabled={!userSchool}
      >
        <option value=''>학교를 선택하세요</option>
        {userSchool &&
          schoolOptions[userSchool as '초' | '중' | '고'].map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
      </select>
      <Spacing size={5} />

      <TextInput
        icon={FaSchool}
        placeholder='학교 직접 입력'
        value={userSchoolName}
        onChange={(e) => setUserSchoolName(e.target.value)}
      />
      <Spacing size={5} />

      <label className='block mb-2'>학년 선택</label>
      <select
        value={grade}
        onChange={(e) =>
          handleGradeChange(
            e,
            setGrade,
            setUserGrade,
            userSchool,
            (school, grade) => updateAge(school, grade, setUserAge),
          )
        }
        className='p-1 border rounded w-full'
      >
        {generateGradeOptions(userSchool)}
      </select>
      <Spacing size={5} />

      <p className='text-sm text-gray-600 text-end'>나이: {userAge}살</p>
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

export default SignupStep3;
