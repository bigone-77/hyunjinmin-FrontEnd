import { useState } from 'react';
import { schoolOptions, schoolCodeMapping } from '@/utils/getCode';
import axios from 'axios';
function NewTimeTableForm() {
  const [className, setClassName] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | ''>('');

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSchoolLevel(e.target.value);
    setSelectedSchool('');
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      window.location.href = '/manager/auth/adminLogin';
      return Promise.reject(new Error('No access token found.'));
    }

    const schoolCode = schoolCodeMapping[selectedSchool] || '';
    const requestData = {
      CLASS_TYPE_NAME: className,
      USE_YN: 'Y',
      SCHL_CD: schoolCode,
      GRADE: selectedGrade,
    };

    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/insertMainClass',
        requestData,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      );

      if (response.data.status === 'success') {
        alert(response.data.msg || '시간표가 성공적으로 추가되었습니다.');
      } else {
        // JWT 토큰 만료 시 처리
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/adminLogin';
        } else {
          alert(response.data.msg || '시간표 추가에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error submitting time table data:', error);
      alert('서버 요청 중 오류가 발생했습니다.');
    }
  };

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
      <h2 className='text-xl font-semibold mb-4'>새 시간표 추가</h2>
      <div className='flex flex-col gap-4 items-start'>
        {/* 첫 번째 select: 학교 레벨 선택 */}
        <select
          value={schoolLevel}
          onChange={handleLevelChange}
          className='border p-2 rounded w-full'
        >
          <option value=''>학교 LEVEL</option>
          <option value='초'>초등학교</option>
          <option value='중'>중학교</option>
          <option value='고'>고등학교</option>
        </select>

        {/* 두 번째 select: 학교 이름 선택 */}
        <select
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          className='border p-2 rounded w-full'
          disabled={!schoolLevel} // 학교 레벨이 선택되지 않으면 비활성화
        >
          <option value=''>학교를 선택하세요</option>
          {schoolLevel &&
            schoolOptions[schoolLevel as '초' | '중' | '고'].map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
        </select>

        {/* 학년 선택 input */}
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(Number(e.target.value))}
          className='border p-2 rounded w-full'
          disabled={!selectedSchool}
        >
          <option value=''>학년을 선택하세요</option>
          {generateGradeOptions(schoolLevel)}
        </select>
        <input
          type='text'
          placeholder='시간표 이름 입력'
          className='border p-1 rounded w-full'
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />

        <button
          className='bg-positive text-white p-2 rounded mt-4 w-full btn-shadow'
          onClick={handleSubmit}
        >
          새 시간표 추가
        </button>
      </div>
    </div>
  );
}

export default NewTimeTableForm;
