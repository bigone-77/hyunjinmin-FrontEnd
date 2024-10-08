import { useState } from 'react';
import ToggleButtons from './ToggleButtons';
import HeaderRow from './HeaderRow';
import TimeSlotRow from './TimeSlotRow';

function TimeTable() {
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

  const classes = [
    {
      id: 1,
      title: '수능특강(정)',
      day: ['월'],
      startTime: 19.5,
      duration: 2.5,
      place: '1강의실',
      bgColor: '#FF5733', // 수능특강(정) - 주황색
    },
    {
      id: 2,
      title: '영어(J)',
      day: ['수'],
      startTime: 17,
      duration: 3,
      place: '5강의실',
      bgColor: '#3498DB', // 영어(J) - 파란색
    },
    {
      id: 3,
      title: '국어(김)',
      day: ['금'],
      startTime: 20,
      duration: 2,
      place: '5강의실',
      bgColor: '#2ECC71', // 국어(김) - 녹색
    },
    {
      id: 4,
      title: '영어(L)',
      day: ['토'],
      startTime: 14,
      duration: 3,
      place: '5강의실',
      bgColor: '#9B59B6', // 영어(L) - 보라색
    },
    {
      id: 5,
      title: '국어',
      day: ['토'],
      startTime: 18,
      duration: 2,
      place: '5강의실',
      bgColor: '#E74C3C', // 국어 - 빨간색
    },
    {
      id: 6,
      title: '정시대비',
      day: ['일'],
      startTime: 11,
      duration: 3,
      place: '5강의실',
      bgColor: '#F1C40F', // 정시대비 - 노란색
    },
  ];

  return (
    <div className='p-0'>
      <ToggleButtons isWeekend={isWeekend} setIsWeekend={setIsWeekend} />
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
                classes={classes}
                days={days}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimeTable;
