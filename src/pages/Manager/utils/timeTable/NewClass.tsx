// import { useState } from 'react';

// function NewClassForm() {
//   const [color, setColor] = useState('#000000');
//   return (
//     <div>
//       <h2 className='text-xl font-semibold mb-4'>새 강의 추가</h2>
//       <div className='flex flex-col gap-4 items-start'>
//         <input
//           type='text'
//           placeholder='과목 입력'
//           className='border p-2 rounded w-full'
//         />
//         <input
//           type='text'
//           placeholder='강의명 입력'
//           className='border p-2 rounded w-full'
//         />
//         <input
//           type='text'
//           placeholder='시작시간 입력 (예: 09:00-10:00)'
//           className='border p-2 rounded w-full'
//         />
//         <input
//           type='text'
//           placeholder='종료시간 입력 (예: 09:00-10:00)'
//           className='border p-2 rounded w-full'
//         />
//         <input
//           type='text'
//           placeholder='강의실 번호'
//           className='border p-2 rounded w-full'
//         />
//         <input
//           type='text'
//           placeholder='요일 입력 (예: 월, 화)'
//           className='border p-2 rounded w-full'
//         />
//         <input
//           type='text'
//           placeholder='가격'
//           className='border p-2 rounded w-full'
//         />
//         {/* 색상 입력 필드 */}
//         <div className='flex items-center gap-4 w-full'>
//           <label className='w-1/3 text-sm font-semibold'>색 선택:</label>
//           <input
//             type='color'
//             value={color}
//             onChange={(e) => setColor(e.target.value)}
//             className='border p-2 rounded w-1/3'
//           />
//           <div
//             className='w-8 h-8 rounded-full'
//             style={{ backgroundColor: color }}
//           ></div>
//         </div>
//         <button className='bg-blue text-white p-2 rounded mt-2 w-full'>
//           새 강의 추가
//         </button>
//       </div>
//     </div>
//   );
// }

// export default NewClassForm;

import { useState } from 'react';
import axios from 'axios';
import { formatTime24to12 } from '@/pages/Manager/utils/timeTable/adminTimeTableInter';

function NewClassForm() {
  const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [roomIndex, setRoomIndex] = useState('');
  const [price, setPrice] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [grade, setGrade] = useState('');
  // const [classDate, setClassDate] = useState('');
  const [classDate, setClassDate] = useState<string[]>([]);
  const [color, setColor] = useState('#000000');
  const [message, setMessage] = useState('');

  const dayToNumberMap: { [key: string]: number } = {
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
    일: 7,
  };

  const handleCheckboxChange = (day: string) => {
    setClassDate(
      (prevClassDate) =>
        prevClassDate.includes(day)
          ? prevClassDate.filter((d) => d !== day) // 선택 해제
          : [...prevClassDate, day], // 선택 추가
    );
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 11; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 22 && minute !== 0) break; // 22시에는 00분만 추가

        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const value = `${formattedHour}${formattedMinute}`; // 예: 1600, 1645
        const label = formatTime24to12(hour, minute); // 보기 편한 형식
        times.push({ value, label });
      }
    }
    return times;
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const numericClassDate = classDate
      .map((day) => dayToNumberMap[day])
      .join(',');

    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/insertClass',
        {
          TEACHER_NM: teacherName,
          CLASS_NAME: className,
          START_TIME: startTime,
          END_TIME: endTime,
          ROOM_IDX: roomIndex,
          PRICE: price,
          SCHL_CD: schoolCode,
          GRADE: grade,
          CLASS_COLOR: color,
          CLASS_DATE: numericClassDate,
        },
        {
          headers: {
            Authorization: `${accessToken}`, //localStrage에 저장된 JWT accessToken사용
          },
        },
      );

      if (response.data.status === 'success') {
        setMessage(response.data.msg || '성공적으로 저장되었습니다.');
      } else {
        setMessage(response.data.msg || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>새 강의 추가</h2>
      <div className='flex flex-col gap-4 items-start'>
        <input
          type='text'
          placeholder='선생님 이름 입력'
          className='border p-2 rounded w-full'
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <input
          type='text'
          placeholder='강의명 입력'
          className='border p-2 rounded w-full'
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        {/* 시작 시간 선택 드롭다운 */}
        <select
          className='border p-2 rounded w-full'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          <option value=''>시작 시간 선택</option>
          {generateTimeOptions().map((time) => (
            <option key={time.value} value={time.value}>
              {time.label} {/* 보기 편한 형식으로 표시 */}
            </option>
          ))}
        </select>
        {/* 종료 시간 선택 드롭다운 */}
        <select
          className='border p-2 rounded w-full'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        >
          <option value=''>종료 시간 선택</option>
          {generateTimeOptions().map((time) => (
            <option key={time.value} value={time.value}>
              {time.label} {/* 보기 편한 형식으로 표시 */}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='강의실 번호'
          className='border p-2 rounded w-full'
          value={roomIndex}
          onChange={(e) => setRoomIndex(e.target.value)}
        />
        {/* 요일 선택 체크박스 */}
        <div className='w-full'>
          <label className='text-sm font-semibold'>요일 선택:</label>
          <div className='flex flex-wrap gap-2 mt-2'>
            {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
              <label key={day} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  value={day}
                  checked={classDate.includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <input
          type='text'
          placeholder='가격'
          className='border p-2 rounded w-full'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type='text'
          placeholder='학교 코드'
          className='border p-2 rounded w-full'
          value={schoolCode}
          onChange={(e) => setSchoolCode(e.target.value)}
        />
        <input
          type='text'
          placeholder='학년'
          className='border p-2 rounded w-full'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <div className='flex items-center gap-4 w-full'>
          <label className='w-1/3 text-sm font-semibold'>색 선택:</label>
          <input
            type='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='border p-2 rounded w-1/3'
          />
          <div
            className='w-8 h-8 rounded-full'
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <button
          className='bg-blue text-white p-2 rounded mt-2 w-full'
          onClick={handleSubmit}
        >
          새 강의 추가
        </button>
        {message && <p className='text-red mt-2'>{message}</p>}
      </div>
    </div>
  );
}

export default NewClassForm;
