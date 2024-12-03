import { useEffect, useState } from 'react';
import { useFetchUserInfo } from '@/components/profile/hooks/useMyInfo'; // 기존 정보 가져오는 훅
import { useChangeInfo } from './hooks/useChangeInfo';
import {
  schoolCodeMapping,
  schoolOptions,
  userSchoolLevel,
} from '@/utils/getCode';
import { updateAge } from '@/pages/auth/Siginup/SiginupFunc';

import {
  loadDaumPostcode,
  handleAddressSearch,
  handlePhoneNumberChange,
  handleAddressNumberChange,
} from '@/pages/auth/Siginup/SiginupFunc';

function ChangeInfoPage() {
  const { userInfo, isLoading, error: fetchError } = useFetchUserInfo(); // 유저 정보 가져오기
  const {
    changeInfo,
    isUpdating,
    error: updateError,
    successMessage,
  } = useChangeInfo();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolCD, setSchoolCD] = useState('');
  const [grade, setGrade] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<number[]>([]); //schoolLevel에 따라 grade가 달라짐
  const [age, setAge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      setPhoneNumber(userInfo.phoneNumber || '');
      setAddressNumber(userInfo.addressNumber || '');
      setAddressDetail(userInfo.addressDetail || '');
    }
  }, [userInfo]);

  useEffect(() => {
    setSchoolName('');
    setGrade(0);
    if (schoolLevel) {
      const maxGrade = schoolLevel === '초' ? 6 : 3;
      setGradeOptions(Array.from({ length: maxGrade }, (_, i) => i + 1));
    }
  }, [schoolLevel]);

  useEffect(() => {
    if (schoolLevel && grade > 0) {
      updateAge(schoolLevel, grade, setAge);
    }
  }, [schoolLevel, grade]);

  useEffect(() => {
    if (schoolName) {
      setSchoolCD(schoolCodeMapping[schoolName] || '');
    }
  }, [schoolName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolCD) {
      alert('유효한 학교 이름을 선택하세요.');
      return;
    }
    await changeInfo({
      name,
      email,
      age,
      grade,
      schoolLevel: userSchoolLevel[schoolLevel], // schoolLevel을 숫자로 변환
      schoolCD,
      phoneNumber,
      addressNumber,
      addressDetail,
    });
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (fetchError) {
    return <p className='text-red-500'>에러: {fetchError}</p>;
  }

  const isFormValid = !phoneError && !addressError;

  return (
    <div
      onSubmit={handleSubmit}
      className='flex flex-col items-center min-h-screen p-6'
    >
      <h1 className='text-2xl font-bold mb-4'>내 정보 수정</h1>
      <div
        className='w-full max-w-md bg-white rounded-lg shadow-md overflow-y-auto'
        style={{ maxHeight: 'calc(100vh - 60px)' }}
      >
        {updateError && <p className='text-red-500 mb-2'>{updateError}</p>}
        {successMessage && (
          <p className='text-green-500 mb-2'>{successMessage}</p>
        )}

        <form className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='email'
            >
              이메일
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>

          {/* 학교 LEVEL */}
          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='schoolLevel'
            >
              학교 LEVEL
            </label>
            <select
              id='schoolLevel'
              value={schoolLevel}
              onChange={(e) => setSchoolLevel(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            >
              <option value=''>학교 LEVEL을 선택하세요</option>
              <option value='초'>초등학교</option>
              <option value='중'>중학교</option>
              <option value='고'>고등학교</option>
            </select>
          </div>

          {/* 학교 이름 */}
          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='schoolName'
            >
              학교 이름
            </label>
            <select
              id='schoolName'
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
              disabled={!schoolLevel} // 학교 LEVEL이 선택되지 않으면 비활성화
            >
              <option value=''>학교 이름을 선택하세요</option>
              {schoolLevel &&
                schoolOptions[schoolLevel as '초' | '중' | '고'].map(
                  (school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ),
                )}
            </select>
          </div>

          {/* 학년 */}
          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='grade'
            >
              학년
            </label>
            <select
              id='grade'
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className='w-full px-3 py-2 border rounded-lg'
              disabled={!schoolName} // 학교 이름이 선택되지 않으면 비활성화
            >
              <option value=''>학년을 선택하세요</option>
              {gradeOptions.map((gradeOption) => (
                <option key={gradeOption} value={gradeOption}>
                  {gradeOption}학년
                </option>
              ))}
            </select>
          </div>

          {/* 계산된 나이 */}
          {age !== null && (
            <div className='mb-4'>
              <p className='text-gray-700 font-bold'>
                나이: <span className='text-blue-500'>{age}살</span>
              </p>
            </div>
          )}

          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='phoneNumber'
            >
              휴대폰 번호
            </label>
            <input
              type='text'
              id='phoneNumber'
              value={phoneNumber}
              onChange={(e) =>
                handlePhoneNumberChange(e, setPhoneNumber, setPhoneError)
              }
              className='w-full px-3 py-2 border rounded-lg'
            />
            {phoneError && (
              <p className='text-red text-sm mt-1'>{phoneError}</p>
            )}
          </div>

          {/* 우편 번호 변경 */}
          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='addressNumber'
            >
              우편번호
            </label>
            <div className='flex'>
              <input
                type='text'
                id='addressNumber'
                value={addressNumber}
                onChange={(e) =>
                  handleAddressNumberChange(
                    e,
                    setAddressNumber,
                    setAddressError,
                  )
                }
                className='w-full px-3 py-2 border rounded-lg'
              />
              <button
                type='button'
                onClick={() =>
                  handleAddressSearch(
                    loadDaumPostcode,
                    setAddressNumber,
                    setAddressDetail,
                  )
                }
                className='ml-2 px-3 py-2 bg-gray-500 text-white rounded-lg'
              >
                검색
              </button>
            </div>
            {addressError && (
              <p className='text-red text-sm mt-1'>{addressError}</p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='addressDetail'
            >
              상세 주소
            </label>
            <input
              type='string'
              id='addressDetail'
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            />
          </div>

          <button
            type='submit'
            className={`w-full py-2 px-4 rounded-lg text-white mb-6 ${
              isUpdating || !isFormValid
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-modify hover:bg-modify-hover'
            }`}
            disabled={isUpdating || !isFormValid}
          >
            {isUpdating ? '업데이트 중...' : '정보 수정'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeInfoPage;
