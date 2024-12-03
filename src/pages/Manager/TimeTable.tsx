import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/timeTable/SearchBar';
import AdminTimeTable from '@/pages/Manager/utils/timeTable/AdminTimeTable';
import NewClassForm from '@/pages/Manager/utils/timeTable/NewClass';
import { useState, useEffect } from 'react';
import NewTimeTableForm from '@/pages/Manager/utils/timeTable/NewTimeTable';
import ToggleButtons from '@/pages/Manager/utils/timeTable/ToggleButtons';
import { useFetchClasses } from '@/pages/Manager/utils/timeTable/hooks/useFetchClasses';
import { useTimeTableYN } from '@/pages/Manager/utils/timeTable/hooks/useTimeTableYN';

function TimeTablePage() {
  const [schoolLevel, setSchoolLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('');
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [selectedResult, setSelectedResult] = useState('');
  const [timeTableYN, setTimeTableYN] = useState('');
  const [isWeekend, setIsWeekend] = useState(false);

  const { timeTableData, fetchClasses, isLoading, error } = useFetchClasses();

  const { toggleTimeTableYN, isLoading: isUpdatingYN } = useTimeTableYN();

  const handleToggleUse = async () => {
    if (selectedResult) {
      const confirmChange = window.confirm(
        `현재 상태는 "${timeTableYN === 'Y' ? '활성화' : '비활성화'}"입니다. 상태를 변경하시겠습니까?`,
      );

      if (!confirmChange) {
        return; // 사용자가 취소를 선택한 경우 함수 종료
      }

      try {
        const newYN = timeTableYN === 'Y' ? 'N' : 'Y';
        await toggleTimeTableYN(Number(selectedResult), newYN);
        setTimeTableYN(newYN);
        fetchClasses(selectedResult, isWeekend);
      } catch (error) {
        alert('변경 중 오류가 발생했습니다.');
      }
    } else {
      alert('먼저 시간표를 선택하세요.');
    }
  };

  useEffect(() => {
    setIsSearchDisabled(!schoolName || !grade);
  }, [schoolName, grade]);

  const handleDayTypeChange = (type: '평일' | '주말') => {
    setIsWeekend(type === '주말');
  };

  useEffect(() => {
    if (selectedResult) {
      fetchClasses(selectedResult, isWeekend);
    }
  }, [isWeekend]);

  const handleResultSelect = () => {
    fetchClasses(selectedResult, isWeekend); // 검색 버튼 클릭 시
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold w-1/7'>시간표 관리</h1>
        </div>
        <div>
          <SearchBar
            schoolLevel={schoolLevel}
            schoolName={schoolName}
            grade={grade}
            setSchoolLevel={setSchoolLevel}
            setSchoolName={setSchoolName}
            setGrade={setGrade}
            isSearchDisabled={isSearchDisabled}
            selectedResult={selectedResult}
            setSelectedResult={setSelectedResult}
            setTimeTableYN={setTimeTableYN}
            onResultSelect={handleResultSelect}
          />
        </div>
        <div className='block'>
          <ToggleButtons
            isWeekend={isWeekend}
            setDayType={handleDayTypeChange}
          />
        </div>
        <div className='flex gap-8 mt-4'>
          <div className='w-2/3 bg-white p-4 rounded-lg shadow-md'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold'>
                {schoolName} {grade}학년 시간표
              </h2>
              <div className='flex items-center space-x-4'>
                <p>활성화 상태:</p>
                <div>
                  {' '}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-white text-xs font-semibold ${
                      timeTableYN === 'Y' ? 'bg-positive' : 'bg-negative'
                    }`}
                  >
                    {timeTableYN === 'Y' ? '활성화' : '비활성화'}
                  </span>
                </div>
                <button
                  onClick={handleToggleUse}
                  disabled={isUpdatingYN}
                  className={`px-4 py-2 text-white rounded ${
                    isUpdatingYN
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-modify hover:bg-modify-hover btn-shadow'
                  }`}
                >
                  {isUpdatingYN ? '변경 중...' : '사용 여부 변경'}
                </button>
              </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            <AdminTimeTable
              data={timeTableData}
              isWeekend={isWeekend}
              refetch={() => fetchClasses(selectedResult, isWeekend)}
            />
          </div>
          <NewTimeTableForm />
          <NewClassForm
            classSeq={selectedResult}
            isWeekend={isWeekend}
            grade={grade}
            schoolLevel={schoolLevel}
            refetch={() => fetchClasses(selectedResult, isWeekend)}
          />
        </div>
      </div>
    </div>
  );
}

export default TimeTablePage;
