import { useEffect, useState } from 'react';
import { dayToNumberMap } from '@/utils/getCode';
import { formatDateTime } from './adminTimeTableFunc';
import { useCreateClass } from '@/pages/Manager/utils/timeTable/hooks/useCreateClass';
import { useFetchPrice } from '@/pages/Manager/utils/timeTable/hooks/useFetchPrice';
import { useTeacherSelect } from '@/pages/Manager/utils/timeTable/hooks/useTeacherSelect';
import { useDupRoomIdx } from '@/pages/Manager/utils/timeTable/hooks/useDupRoomIdx';

function NewClassForm({
  classSeq,
  isWeekend,
  grade,
  schoolLevel,
  refetch,
}: {
  classSeq: string;
  isWeekend: boolean;
  grade: string;
  schoolLevel: string;
  refetch: () => void;
}) {
  const [classGB, setClassGB] = useState(''); //과목 ('국' = '1', '영' = '2', '수'= '3', '과' = '4')
  const [teacherName, setTeacherName] = useState(''); //선생님 이름
  const [teacherId, setTeacherId] = useState<number | null>(null); //선택한 선생님의 ID
  const [className, setClassName] = useState(''); //수업 이름
  const [startHour, setStartHour] = useState(''); // 시작 시
  const [startMinute, setStartMinute] = useState(''); // 시작 분
  const [endHour, setEndHour] = useState(''); // 종료 시
  const [endMinute, setEndMinute] = useState(''); // 종료 분
  const [roomIndex, setRoomIndex] = useState<string>(''); //강의실 번호
  const [classDate, setClassDate] = useState<string[]>([]); //수업일
  const [color, setColor] = useState('#000000'); //수업 색깔

  const { price, fetchPrice, message: priceMessage } = useFetchPrice();
  const { createClass, message: submitMessage } = useCreateClass();
  const { teachers, isLoading, error, teacherSelect } = useTeacherSelect({
    subject: classGB,
  });

  const minutes = ['00', '15', '30', '45'];
  const subject = ['국어', '영어', '수학', '과학'];
  const week = ['월', '화', '수', '목', '금', '토', '일'];
  const subjectColors = {
    국어: '#689f38',
    영어: '#e64a19',
    수학: '#0288d1',
    과학: '#455a64',
  };

  useEffect(() => {
    if (classGB && grade && schoolLevel) {
      fetchPrice(classGB, grade, schoolLevel);
    }
  }, [classGB, grade, schoolLevel]);

  useEffect(() => {
    if (classGB) {
      setColor(
        subjectColors[classGB as keyof typeof subjectColors] || '#000000',
      );
    }
    teacherSelect();
  }, [classGB]);

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

  const handleSubmit = async () => {
    const numericClassDate = classDate
      .map((day) => dayToNumberMap[day])
      .join(',');
    const currentDateTime = formatDateTime(new Date());

    const classData = {
      CLASS_MAIN_SEQ: classSeq,
      ELEMENT_GB: classGB,
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
    };

    try {
      createClass(classData);
      refetch();
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleClassGBChange = (subject: string) => {
    if (classGB === subject) {
      setClassGB(''); // 선택 해제
      setTeacherName('');
    } else {
      setClassGB(subject); // 선택 추가
    }
  };

  const handleTeacherChange = (selectedTeacherName: string) => {
    setTeacherName(selectedTeacherName);

    const selectedTeacher = teachers.find(
      (teacher) => teacher.name === selectedTeacherName,
    );
    //
    if (selectedTeacher) {
      setTeacherId(selectedTeacher.id); // 정확히 일치하는 teacherId 설정
    } else {
      setTeacherId(null); // 일치하는 항목이 없으면 null로 설정
    }
  };

  // useDupRoomIdx 호출
  const {
    isLoading: isDupChecking,
    error: dupError,
    checkDuplication,
  } = useDupRoomIdx();

  useEffect(() => {
    if (
      roomIndex &&
      teacherId &&
      classDate.length > 0 &&
      startHour.length > 0 &&
      startMinute.length > 0 &&
      endHour.length > 0 &&
      endMinute.length > 0
    ) {
      const numericClassDate = classDate
        .map((day) => dayToNumberMap[day])
        .join(',');

      const startTime = startHour + startMinute;
      const endTime = endHour + endMinute;
      checkDuplication(
        roomIndex,
        teacherId,
        numericClassDate,
        startTime,
        endTime,
      );
    }
  }, [
    roomIndex,
    teacherId,
    classDate,
    startHour,
    startMinute,
    endHour,
    endMinute,
  ]);

  return (
    <div className='w-1/3'>
      <h2 className='text-xl font-semibold mb-4'>현재 시간표에 새 강의 추가</h2>
      <div className='flex gap-8 items-start'>
        <div className='flex-1 w-1/2'>
          {/* 요일 선택 체크박스 */}
          <div className='w-full mb-4'>
            <label className='text-sm font-semibold'>요일 선택:</label>
            <div className='flex flex-wrap gap-2 mt-2'>
              {week.map((day) => (
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

          <label className='text-sm font-semibold'>과목 선택:</label>
          <div className='flex flex-wrap gap-2 mb-4'>
            {subject.map((subject) => (
              <label key={subject} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={classGB === subject}
                  onChange={() => handleClassGBChange(subject)}
                  disabled={classDate.length === 0}
                />
                {subject}
              </label>
            ))}
          </div>

          {/* 선생님 선택 드롭다운 */}
          <label className='text-sm font-semibold'>선생님 선택:</label>
          <select
            className='border p-1 rounded w-full mb-4'
            value={teacherName}
            onChange={(e) => handleTeacherChange(e.target.value)}
            disabled={!classGB || isLoading} // 과목이 선택되지 않거나 로딩 중일 때 비활성화
          >
            <option value=''>선생님 선택</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.name}>
                {teacher.name}
              </option>
            ))}
          </select>

          {/* 강의실 선택 */}
          <label className='text-sm font-semibold'>강의실 선택:</label>
          <select
            className='border p-1 rounded w-full mb-4'
            value={roomIndex}
            onChange={(e) => setRoomIndex(e.target.value)} // 정수로 변환하여 저장
            disabled={!teacherName}
          >
            <option value=''>강의실 선택</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
              <option key={room} value={`${room}`}>
                {' '}
                {/* room을 string으로 변환 */}
                {`${room}강의실`}
              </option>
            ))}
          </select>

          {/* 시작 시간 선택 드롭다운 */}
          <label className='text-sm font-semibold'>수업 시작 시간 선택:</label>
          <div className='flex gap-2 mt-2 mb-4'>
            <select
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              disabled={!roomIndex}
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
              disabled={!roomIndex}
            >
              <option value=''>분</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>

          <label className='text-sm font-semibold'>수업 종료 시간 선택:</label>
          <div className='flex gap-2 mt-2 mb-4'>
            <select
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              disabled={!roomIndex}
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
              disabled={!roomIndex}
            >
              <option value=''>분</option>
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex-2 w-1/2'>
          <label className='text-sm font-semibold'>강의명 입력:</label>
          <input
            type='text'
            placeholder='강의명 입력'
            className='border p-1 rounded w-full mb-4'
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          {/* 수업 가격 */}
          <input
            type='text'
            placeholder='가격'
            className='border p-1 rounded w-full mb-4'
            value={price ? `${price}원` : '가격을 가져오는 중...'}
            readOnly
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
        className={`bg-blue text-white p-2 rounded mt-2 w-full ${
          !price ? 'bg-close' : 'hover:bg-save-hover'
        }`}
        onClick={handleSubmit}
        disabled={!price}
      >
        새 강의 추가
      </button>
      {priceMessage && <p>{priceMessage}</p>}
      {submitMessage && <p>{submitMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default NewClassForm;
