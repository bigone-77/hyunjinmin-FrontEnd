// import { useState } from 'react';
// import ToggleButtons from './ToggleButtons';
// import AdminHeaderRow from './AdminHeaderRow';
// import AdminTimeSlotRow from './AdminTimeSlotRow';

// interface ClassData {
//   classSeq: number;
//   teacherName: string;
//   className: string;
//   startTime: number;
//   endTime: number;
//   roomIndex: string;
//   price: number;
//   schoolCode: string;
//   schoolName: string;
//   grade: string;
//   regDate: string;
//   classColor: string;
//   classDate: string;
// }

// interface TimeTableProps {
//   data: ClassData[];
// }

// function AdminTimeTable({ data }: TimeTableProps) {
//   const [isWeekend, setIsWeekend] = useState(false);

//   const generateTimeSlots = (start: number, end: number) => {
//     const slots = [];
//     for (let hour = start; hour <= end; hour++) {
//       for (let minute = 0; minute < 60; minute += 15) {
//         slots.push(`${hour}:${minute === 0 ? '00' : minute}`);
//       }
//     }
//     return slots;
//   };

//   const weekdayTimeSlots = generateTimeSlots(16, 21);
//   const weekendTimeSlots = generateTimeSlots(11, 20);

//   const weekDays = ['월', '화', '수', '목', '금'];
//   const weekendDays = ['토', '일'];

//   const timeSlots = isWeekend ? weekendTimeSlots : weekdayTimeSlots;
//   const days = isWeekend ? weekendDays : weekDays;

//   const handleDayTypeChange = (type: '평일' | '주말') => {
//     setIsWeekend(type === '주말');
//   };

//   return (
//     <div className='p-0'>
//       <div
//         style={{ height: '500px', overflowY: 'auto' }}
//         className='border-gray-300 rounded-xl'
//       >
//         <table className='min-w-full border border-gray-300'>
//           <AdminHeaderRow days={days} isWeekend={isWeekend} />
//           <tbody>
//             {timeSlots.map((time, slotIndex) => (
//               <AdminTimeSlotRow
//                 key={time}
//                 time={time}
//                 slotIndex={slotIndex}
//                 timeSlots={timeSlots}
//                 classes={data} // API로부터 받은 데이터를 classes로 사용
//                 days={days}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ToggleButtons isWeekend={isWeekend} setDayType={handleDayTypeChange} />
//     </div>
//   );
// }

// export default AdminTimeTable;

import { useState, useEffect } from 'react';
import axios from 'axios';
import ToggleButtons from './ToggleButtons';
import AdminHeaderRow from './AdminHeaderRow';
import AdminTimeSlotRow from './AdminTimeSlotRow';
import { dayNumberToString } from './adminTimeTableInter';

interface ClassData {
  classSeq: number;
  teacherName: string;
  className: string;
  startTime: string;
  endTime: string;
  roomIndex: string;
  price: number;
  schoolCode: string;
  schoolName: string;
  grade: string;
  regDate: string;
  classColor: string;
  classDate: string[]; // 요일 문자열 배열 (['월', '화', ...])
}

interface AdminTimeTableProps {
  data: ClassData[];
}

function AdminTimeTable({ data }: AdminTimeTableProps) {
  const [timeTableData, setTimeTableData] = useState<ClassData[]>([]);
  const [isWeekend, setIsWeekend] = useState(false); // 주말/평일 설정
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  useEffect(() => {
    setTimeTableData(data);
  }, [data]);

  const fetchTimeTableData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/classList',
        {
          SCHL_CD: school,
          GRADE: grade,
          DAY_GB: isWeekend ? '주말' : '평일',
        },
        {
          headers: {
            Authorization: `${accessToken}`, //localStrage에 저장된 JWT accessToken사용
          },
        },
      );

      console.log('Server response:', response); // 디버깅용

      if (response.data.status === 'success') {
        const classListData = response.data.dl_classList.map(
          (classItem: any) => {
            // 시간 문자열을 시간.분 형식으로 변환
            const startHour = parseInt(classItem.START_TIME.slice(0, 2));
            const startMinute = parseInt(classItem.START_TIME.slice(2)) / 60;
            const endHour = parseInt(classItem.END_TIME.slice(0, 2));
            const endMinute = parseInt(classItem.END_TIME.slice(2)) / 60;

            const startTime = startHour + startMinute; // 19.5 형식으로 변환
            const endTime = endHour + endMinute;
            const duration = endTime - startTime; // 수업의 지속 시간 계산

            return {
              classSeq: classItem.CLASS_SEQ,
              title: classItem.CLASS_NAME,
              day: [dayNumberToString(classItem.CLASS_DATE)],
              startTime: startTime, // 변환된 시작 시간
              duration: duration, // 수업의 지속 시간
              place: classItem.ROOM_IDX.toString(),
              bgColor: `${classItem.CLASS_COLOR}`, // 수업 색상
            };
          },
        );

        console.log('Processed classListData:', classListData); // 변환된 데이터 출력(디버깅용)
        setTimeTableData(classListData);
      } else if (response.data.status === 'SO') {
        //로그인
      } else {
        console.error('Error message from server:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  // school과 grade의 값이 있을 때만 검색 버튼을 활성화
  useEffect(() => {
    setIsSearchDisabled(!school || !grade);
  }, [school, grade]);

  const handleDayTypeChange = (type: '평일' | '주말') => {
    setIsWeekend(type === '주말');
  };

  const generateTimeSlots = (start: number, end: number) => {
    const slots = [];
    for (let hour = start; hour <= end; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push(`${hour}:${minute === 0 ? '00' : minute}`);
      }
    }
    return slots;
  };

  const weekdayTimeSlots = generateTimeSlots(16, 21);
  const weekendTimeSlots = generateTimeSlots(11, 20);

  const timeSlots = isWeekend ? weekendTimeSlots : weekdayTimeSlots;
  const days = isWeekend ? ['토', '일'] : ['월', '화', '수', '목', '금'];

  return (
    <div className='p-0'>
      <div className='flex items-center mb-4'>
        {/* 주말/평일 설정 버튼 */}
        <ToggleButtons isWeekend={isWeekend} setDayType={handleDayTypeChange} />

        {/* 검색 필드와 버튼 */}
        <input
          type='text'
          placeholder='학교 코드 입력'
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className='border p-2 rounded mr-2'
        />
        <input
          type='text'
          placeholder='학년 입력'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className='border p-2 rounded mr-2'
        />
        <button
          onClick={fetchTimeTableData}
          disabled={isSearchDisabled}
          className={`p-2 rounded ${
            isSearchDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue text-white'
          }`}
        >
          검색
        </button>
      </div>

      {/* 시간표 */}
      <div
        style={{ height: '500px', overflowY: 'auto' }}
        className='border-gray-300 rounded-xl'
      >
        <table className='min-w-full border border-gray-300'>
          <AdminHeaderRow days={days} isWeekend={isWeekend} />
          <tbody>
            {timeSlots.map((time, slotIndex) => (
              <AdminTimeSlotRow
                key={time}
                time={time}
                slotIndex={slotIndex}
                timeSlots={timeSlots}
                classes={timeTableData}
                days={days}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTimeTable;
