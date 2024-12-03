import { useState } from 'react';
import ToggleButtons from './ToggleButtons';
import HeaderRow from './HeaderRow';
import TimeSlotRow from './TimeSlotRow';

import { useClassList } from '@/components/Table/hooks/useClasses';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms/user';
function TimeTable() {
  // Recoil에서 userId 가져오기
  const { userId } = useRecoilValue(userState);

  // LocalStorage에서 accessToken 가져오기
  const accessToken = localStorage.getItem('accessToken');

  const [isWeekend, setIsWeekend] = useState(false);

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

  const weekDays = ['월', '화', '수', '목', '금'];
  const weekendDays = ['토', '일'];

  const timeSlots = isWeekend ? weekendTimeSlots : weekdayTimeSlots;
  const days = isWeekend ? weekendDays : weekDays;

  const { data: classList = [] } = useClassList(
    userId,
    accessToken,
    isWeekend ? '주말' : '평일',
  );

  return (
    <div className='p-0'>
      <div
        style={{ height: '500px', overflowY: 'auto' }}
        className='border-gray-300 rounded-xl'
      >
        <table className='min-w-full border border-gray-300'>
          <HeaderRow days={days} isWeekend={isWeekend} />
          <tbody>
            {timeSlots.map((time, slotIndex) => (
              <TimeSlotRow
                key={time}
                time={time}
                slotIndex={slotIndex}
                timeSlots={timeSlots}
                classes={classList}
                days={days}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ToggleButtons isWeekend={isWeekend} setIsWeekend={setIsWeekend} />
    </div>
  );
}

export default TimeTable;
