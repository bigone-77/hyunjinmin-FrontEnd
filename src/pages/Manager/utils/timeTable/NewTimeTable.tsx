import { useState } from 'react';
import { schoolOptions, schoolCodeMapping } from '@/utils/getCode';
import { useInsertTimeTable } from '@/pages/Manager/utils/timeTable/hooks/useInsertTimeTable';

function NewTimeTableForm() {
  const [className, setClassName] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | ''>('');

  const { insertTimeTable, isLoading, error } = useInsertTimeTable();

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSchoolLevel(e.target.value);
    setSelectedSchool('');
  };

  const handleSubmit = async () => {
    const schoolCode = schoolCodeMapping[selectedSchool] || '';
    const isSuccess = await insertTimeTable(
      className,
      schoolCode,
      selectedGrade,
    );
    if (isSuccess) {
      setClassName('');
      setSchoolLevel('');
      setSelectedSchool('');
      setSelectedGrade('');
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
          {isLoading ? '추가 중...' : '새 시간표 추가'}
        </button>
      </div>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}

export default NewTimeTableForm;
