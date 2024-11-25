import { useEffect, useState } from 'react';
import axios from 'axios';
import { dayToNumberMap, classGBMap, userSchoolLevel } from '@/utils/getCode';

function NewClassForm({
  classSeq,
  isWeekend,
  grade,
  schoolLevel,
}: {
  classSeq: string;
  isWeekend: boolean;
  grade: string;
  schoolLevel: string;
}) {
  const [classGB, setClassGB] = useState(''); //과목 ('국' = '1', '영' = '2', '수'= '3', '과' = '4')
  const [teacherName, setTeacherName] = useState(''); //선생님 이름
  const [className, setClassName] = useState(''); //수업 이름
  const [startHour, setStartHour] = useState('16'); // 시작 시
  const [startMinute, setStartMinute] = useState('00'); // 시작 분
  const [endHour, setEndHour] = useState('17'); // 종료 시
  const [endMinute, setEndMinute] = useState('00'); // 종료 분
  const [roomIndex, setRoomIndex] = useState<string | number>(''); //강의실 번호
  const [price, setPrice] = useState(''); //가격 - grade,classGB,schoolGB로 정해짐
  const [classDate, setClassDate] = useState<string[]>([]); //수업일
  const [color, setColor] = useState('#000000'); //수업 색깔
  const [message, setMessage] = useState(''); //에러 메시지

  useEffect(() => {
    if (classGB && grade && schoolLevel) {
      handlePrice();
    }
  }, [classGB, grade, schoolLevel]);

  useEffect(() => {
    if (classGB) {
      setColor(
        subjectColors[classGB as keyof typeof subjectColors] || '#000000',
      );
    }
  }, [classGB]);

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleCheckboxChange = (day: string) => {
    setClassDate(
      (prevClassDate) =>
        prevClassDate.includes(day)
          ? prevClassDate.filter((d) => d !== day) // 선택 해제
          : [...prevClassDate, day], // 선택 추가
    );
  };

  const generateHours = () => {
    const startHour = isWeekend ? 11 : 16;
    const hours = [];
    for (let i = startHour; i <= 22; i++) {
      const hour12Format = i <= 12 ? i : i - 12;
      const suffix = i < 12 ? '오전' : '오후';
      hours.push({
        value: i.toString().padStart(2, '0'),
        label: `${hour12Format} ${suffix}`,
      });
    }
    return hours;
  };

  const generateEndHours = (startHour: string) => {
    const start = isWeekend ? 11 : 16;
    const hours = [];
    const startHourNumeric = parseInt(startHour, 10);

    for (let i = Math.max(start, startHourNumeric + 1); i <= 22; i++) {
      const hour12Format = i <= 12 ? i : i - 12;
      const suffix = i < 12 ? '오전' : '오후';
      hours.push({
        value: i.toString().padStart(2, '0'),
        label: `${hour12Format} ${suffix}`,
      });
    }
    return hours;
  };

  const minutes = ['00', '15', '30', '45'];

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const numericClassDate = classDate
      .map((day) => dayToNumberMap[day])
      .join(',');

    const currentDateTime = formatDateTime(new Date());

    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/insertClass',
        {
          CLASS_MAIN_SEQ: classSeq,
          ELEMENT_GB: classGBMap[classGB] || '',
          TEACHER_NM: teacherName,
          CLASS_NAME: className,
          START_TIME: `${startHour}${startMinute}`,
          END_TIME: `${endHour}${endMinute}`,
          ROOM_IDX: roomIndex,
          PRICE: price,
          GRADE: grade,
          CLASS_COLOR: color,
          CLASS_DATE: numericClassDate,
          REG_DT: currentDateTime,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
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

  const handlePrice = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const mappedSchoolLevel = userSchoolLevel[schoolLevel]; //이게 필요없어지고

    const request = {
      ELEMENT_GB: classGBMap[classGB] || '',
      GRADE: grade, //props로 받은 grade사용
      SCHL_LV: mappedSchoolLevel, //SCHL_LV: props로 받은 schoolLevel
    };
    console.log('request', request);
    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/selectElementMap',
        {
          ELEMENT_GB: classGBMap[classGB] || '',
          GRADE: grade,
          SCHL_LV: mappedSchoolLevel,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      );
      console.log('response', response);
      if (response.data.status === 'success') {
        // 서버 응답에서 가격 데이터를 추출하여 설정
        const priceData = response.data.ElementMap.PRICE || ''; // 응답에 가격 정보가 있다고 가정
        setPrice(priceData);
        setMessage(response.data.msg || '가격이 성공적으로 설정되었습니다.');
      } else {
        setMessage(response.data.msg || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('서버 요청 중 오류가 발생했습니다.');
    }
  };

  const subjectColors = {
    국어: '#689f38',
    영어: '#e64a19',
    수학: '#0288d1',
    과학: '#455a64',
  };

  const handleClassGBChange = (subject: string) => {
    if (classGB === subject) {
      setClassGB(''); // 선택 해제
    } else {
      setClassGB(subject); // 선택 추가
    }
  };

  return (
    <div className='w-1/3'>
      <h2 className='text-xl font-semibold mb-4'>현재 시간표에 새 강의 추가</h2>
      <div className='flex gap-8 items-start'>
        <div className='flex-1 w-1/2'>
          <label className='text-sm font-semibold'>과목 선택:</label>
          <div className='flex flex-wrap gap-2 mb-4'>
            {['국어', '영어', '수학', '과학'].map((subject) => (
              <label key={subject} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={classGB === subject}
                  onChange={() => handleClassGBChange(subject)}
                />
                {subject}
              </label>
            ))}
          </div>
          <input
            type='text'
            placeholder='선생님 이름 입력'
            className='border p-1 rounded w-full mb-4'
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />
          <input
            type='text'
            placeholder='강의명 입력'
            className='border p-1 rounded w-full mb-4'
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          {/* 시작 시간 선택 드롭다운 */}
          <label>시작 시간 선택</label>
          <div className='flex gap-2 mt-2 mb-4'>
            <select
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            >
              <option value=''>시</option>
              {generateHours().map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              value={startMinute}
              onChange={(e) => setStartMinute(e.target.value)}
            >
              <option value=''>분</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>

          <label>종료 시간 선택:</label>
          <div className='flex gap-2 mt-2 mb-4'>
            <select
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            >
              <option value=''>시</option>
              {generateEndHours(startHour).map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              value={endMinute}
              onChange={(e) => setEndMinute(e.target.value)}
            >
              <option value=''>분</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>

          {/* 강의실 선택 */}
          <select
            className='border p-1 rounded w-full mb-4'
            value={roomIndex}
            onChange={(e) => setRoomIndex(parseInt(e.target.value, 10))} // 정수로 변환하여 저장
          >
            <option value=''>강의실 선택</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
              <option key={room} value={room}>
                {`${room}강의실`} {/* 사용자에게는 '1강의실' 형식으로 표시 */}
              </option>
            ))}
          </select>
        </div>

        <div className='flex-2 w-1/2'>
          {/* 요일 선택 체크박스 */}
          <div className='w-full mb-4'>
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

          {/* 수업 가격 */}
          <input
            type='text'
            placeholder='가격'
            className='border p-1 rounded w-full mb-4'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className='flex items-center gap-4 w-full'>
            <label className='w-1/3 text-sm font-semibold'>강의 색</label>
            <input
              type='color'
              value={color}
              disabled // 자동 설정된 색상만 사용
              className='border p-1 rounded w-1/3'
            />
            <div
              className='w-8 h-8 rounded-full'
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>
      <button
        className='bg-blue text-white p-2 rounded mt-2 w-full'
        onClick={handleSubmit}
      >
        새 강의 추가
      </button>
      {message && <p className='text-red mt-2'>{message}</p>}
    </div>
  );
}

export default NewClassForm;
