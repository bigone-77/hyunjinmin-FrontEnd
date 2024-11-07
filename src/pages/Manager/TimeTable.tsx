// import Header from '@/pages/Manager/utils/Header';
// import Lnb from '@/pages/Manager/utils/Lnb';
// import SearchBar from '@/pages/Manager/utils/timeTable/SearchBar';
// import TimeTable from '@/components/Table/TimeTable';
// import NewTimeTableForm from '@/pages/Manager/utils/timeTable/NewTimeTable';
// import NewClassForm from '@/pages/Manager/utils/timeTable/NewClass';

// function TimeTablePage() {
//   return (
//     <div className='w-full h-screen flex flex-col'>
//       <Header />
//       <Lnb />
//       <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
//         <div className='flex items-center justify-between mb-4'>
//           <h1 className='text-2xl font-bold'>시간표 관리</h1>
//           <SearchBar
//             school={''}
//             grade={''}
//             setSchool={() => {}}
//             setGrade={() => {}}
//             onSearch={() => {}}
//             isSearchDisabled={true}
//           />
//         </div>
//         <div className='flex gap-8'>
//           {/* Left side */}
//           <div className='w-2/3 bg-white p-4 rounded-lg shadow-md'>
//             <h2 className='text-xl font-semibold mb-4'>청량고 3학년 시간표</h2>
//             <TimeTable data={[]} />
//           </div>

//           {/* Right side */}

//           <NewTimeTableForm />
//           <NewClassForm />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TimeTablePage;

import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/timeTable/SearchBar';
import AdminTimeTable from '@/pages/Manager/utils/timeTable/AdminTimeTable';
import NewClassForm from '@/pages/Manager/utils/timeTable/NewClass';
import DeleteClassForm from '@/pages/Manager/utils/timeTable/DeleteClass';

import { useState, useEffect } from 'react';
import axios from 'axios';

function TimeTablePage() {
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [timeTableData, setTimeTableData] = useState([]);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  useEffect(() => {
    setIsSearchDisabled(!school || !grade);
  }, [school, grade]);

  const fetchTimeTable = async () => {
    try {
      const response = await axios.post('http://localhost:8080/classList', {
        SCHL_CD: school,
        GRADE: grade,
        DAY_GB: '평일', // 초기값 설정 (평일 or 주말)
      });

      if (response.data.status === 'success') {
        const classListData = response.data.dl_classList.map(
          (classItem: any) => ({
            classSeq: classItem.CLASS_SEQ,
            teacherName: classItem.TEACHER_NM,
            className: classItem.CLASS_NAME,
            startTime: classItem.START_TIME,
            endTime: classItem.END_TIME,
            roomIndex: classItem.ROOM_IDX,
            price: classItem.PRICE,
            schoolCode: classItem.SCHL_CD,
            schoolName: classItem.SCHL_NM,
            grade: classItem.GRADE,
            regDate: classItem.REG_DT,
            classColor: classItem.CLASS_COLOR,
            classDate: classItem.CLASS_DATE,
          }),
        );
        setTimeTableData(classListData);
      } else {
        console.error(response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  const handleSearch = () => {
    if (school && grade) {
      fetchTimeTable();
    }
  };

  const handleDeleteSuccess = () => {
    fetchTimeTable(); // 삭제 성공 후 시간표를 다시 불러옵니다.
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>시간표 관리</h1>
          <SearchBar
            school={school}
            grade={grade}
            setSchool={setSchool}
            setGrade={setGrade}
            onSearch={handleSearch}
            isSearchDisabled={isSearchDisabled}
          />
        </div>
        <div className='flex gap-8 mt-4'>
          {/* Left side */}
          <div className='w-2/3 bg-white p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>
              {school} {grade}학년 시간표
            </h2>
            <AdminTimeTable data={timeTableData} />
          </div>

          {/* Right side */}
          <NewClassForm />
          <DeleteClassForm onDeleteSuccess={handleDeleteSuccess} />
        </div>
      </div>
    </div>
  );
}

export default TimeTablePage;
