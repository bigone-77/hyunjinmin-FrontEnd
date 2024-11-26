import Spacing from '@/components/shared/Spacing';
import { MdClass } from 'react-icons/md';

import { SignupStep5Props } from './SignupInter';
import { handleClassChange } from './SiginupFunc';
import { useEffect, useState } from 'react';

// 사용자가 듣는 수업 정보
function SignupStep5({ setUserClasses, onPrevious, onNext }: SignupStep5Props) {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); //비밀번호 비활성화
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  useEffect(() => {
    // 선택된 수업이 있으면 버튼 활성화
    if (selectedClasses.length > 0) {
      setIsButtonDisabled(false);
      setUserClasses(selectedClasses.join(', ')); // 선택된 수업들을 문자열로 업데이트
      setError(null); // 에러 상태 제거
    } else {
      setIsButtonDisabled(true);
      setError('하나 이상의 수업을 선택해주세요.');
    }
  }, [selectedClasses, setUserClasses]);

  return (
    <div>
      <label className='flex mb-2'>
        <MdClass />
        듣는 수업 선택
      </label>
      <div className='flex flex-col'>
        {['영어', '수학', '국어', '과학'].map((subject) => (
          <label key={subject} className='flex items-center mb-2'>
            <input
              type='checkbox'
              value={subject}
              onChange={(e) =>
                handleClassChange(e, selectedClasses, setSelectedClasses)
              }
              className='mr-2 h-5 w-5 rounded-xl' // 체크박스 크기 설정
            />
            <span className='text-xl'>{subject}</span>
          </label>
        ))}
      </div>
      {error && <p className='text-red text-sm mt-2'>{error}</p>}
      <Spacing size={10} />
      <button
        onClick={onPrevious}
        className='bg-gray-300 p-2 rounded-xl absolute bottom-20 left-5 right-5'
      >
        이전
      </button>

      {/* 회원가입 버튼 */}
      <button
        onClick={onNext}
        className={`bg-primary text-white p-2 rounded-xl absolute bottom-8 left-5 right-5 ${
          isButtonDisabled ? 'opacity-25' : ''
        }`}
        disabled={isButtonDisabled}
      >
        회원가입
      </button>
    </div>
  );
}

export default SignupStep5;
