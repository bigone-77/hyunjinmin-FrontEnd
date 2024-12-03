import { useState, useEffect } from 'react';
import AdminHeaderRow from './AdminHeaderRow';
import AdminTimeSlotRow from './AdminTimeSlotRow';
import { Class } from '@/pages/Manager/utils/timeTable/adminTimeTableInter';

interface AdminTimeTableProps {
  data: Class[];
  isWeekend: boolean;
}

function AdminTimeTable({
  data,
  isWeekend,
  refetch,
}: AdminTimeTableProps & { refetch: () => void }) {
  const [timeTableData, setTimeTableData] = useState<Class[]>([]);

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
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTimeTable;
