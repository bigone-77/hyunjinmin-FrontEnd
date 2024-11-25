import { useState, useEffect } from 'react';
import AdminHeaderRow from './AdminHeaderRow';
import AdminTimeSlotRow from './AdminTimeSlotRow';

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
  isWeekend: boolean;
}

function AdminTimeTable({ data, isWeekend }: AdminTimeTableProps) {
  const [timeTableData, setTimeTableData] = useState<ClassData[]>([]);

  useEffect(() => {
    setTimeTableData(data);
  }, [data]);

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
