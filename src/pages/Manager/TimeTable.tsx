import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/timeTable/SearchBar';
import AdminTimeTable from '@/pages/Manager/utils/timeTable/AdminTimeTable';
import NewClassForm from '@/pages/Manager/utils/timeTable/NewClass';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTimeTableForm from '@/pages/Manager/utils/timeTable/NewTimeTable';
import { dayNumberToString } from '@/pages/Manager/utils/timeTable/adminTimeTableInter';
import ToggleButtons from '@/pages/Manager/utils/timeTable/ToggleButtons';

function TimeTablePage() {
  const [schoolLevel, setSchoolLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('');
  const [timeTableData, setTimeTableData] = useState([]);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [selectedResult, setSelectedResult] = useState('');
  const [isWeekend, setIsWeekend] = useState(false);

  // ELEMENT_GB : "3" - newClass에서  GRADE: "1" SCHL_LV: 1
  useEffect(() => {
    setIsSearchDisabled(!schoolName || !grade);
  }, [schoolName, grade]);

  const handleDayTypeChange = (type: '평일' | '주말') => {
    setIsWeekend(type === '주말');
  };

  useEffect(() => {
    if (selectedResult) {
      fetchTimeTable();
    }
  }, [isWeekend]);

  const fetchTimeTable = async () => {
    const accessToken = localStorage.getItem('accessToken');
    //JWT토큰 없다면 로그인으로 이동
    if (!accessToken) {
      window.location.href = '/manager/auth/adminLogin';
      return Promise.reject(new Error('No access token found.'));
    }
    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/classList',
        {
          CLASS_MAIN_SEQ: selectedResult,
          DAY_GB: isWeekend ? '주말' : '평일',
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      );
      if (response.data.status === 'success') {
        const classListData = response.data.dl_classList.map(
          (classItem: any) => {
            const startHour = parseInt(classItem.START_TIME.slice(0, 2));
            const startMinute = parseInt(classItem.START_TIME.slice(2)) / 60;
            const endHour = parseInt(classItem.END_TIME.slice(0, 2));
            const endMinute = parseInt(classItem.END_TIME.slice(2)) / 60;

            const startTime = startHour + startMinute; // 19.5 형식으로 변환
            const endTime = endHour + endMinute;
            const duration = endTime - startTime;
            return {
              classSeq: classItem.CLASS_SEQ,
              title: classItem.CLASS_NAME,
              day: [dayNumberToString(classItem.CLASS_DATE)],
              teacherName: classItem.TEACHER_NM,
              className: classItem.CLASS_NAME,
              startTime: startTime,
              duration: duration,
              place: classItem.ROOM_IDX.toString(),
              price: classItem.PRICE,
              bgColor: `${classItem.CLASS_COLOR}`,
              schoolCode: classItem.SCHL_CD,
              schoolName: classItem.SCHL_NM,
              grade: classItem.GRADE,
              regDate: classItem.REG_DT,
              classColor: classItem.CLASS_COLOR,
              classDate: classItem.CLASS_DATE,
            };
          },
        );
        setTimeTableData(classListData);
        console.log('transform classData', classListData);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/adminLogin';
        }
        console.error(response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  const handleResultSelect = () => {
    fetchTimeTable();
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
            <h2 className='text-xl font-semibold mb-4'>
              {schoolName} {grade}학년 시간표
            </h2>
            <AdminTimeTable data={timeTableData} isWeekend={isWeekend} />
          </div>
          <NewTimeTableForm />
          {/* <NewClassForm classSeq={selectedResult} isWeekend={isWeekend} /> */}
          <NewClassForm
            classSeq={selectedResult}
            isWeekend={isWeekend}
            grade={grade}
            schoolLevel={schoolLevel}
          />
        </div>
      </div>
    </div>
  );
}

export default TimeTablePage;
