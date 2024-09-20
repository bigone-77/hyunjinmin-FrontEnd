import { flexColumn } from '@/styles/flex';
import { useEffect, useRef, useState } from 'react';

function TimeTable() {
  const [tdHeight, setTdHeight] = useState(0);
  const tdRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    if (tdRef.current) {
      setTdHeight(tdRef.current.offsetHeight);
    }
  }, []);

  const timeSlots = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const days = ['월', '화', '수', '목', '금'];

  const classes = [
    {
      id: 1,
      title: '수학의 정석',
      day: '화',
      startTime: 12,
      duration: 3.3,
      place: '318호',
      bgColor: 'orange',
    },
    {
      id: 2,
      title: '국어의 정석',
      day: '목',
      startTime: 1,
      duration: 2,
      place: '316호',
      bgColor: 'green',
    },
  ];

  return (
    <div className='w-full overflow-x-auto border rounded-lg shadow-lg'>
      <table className='min-w-full border border-collapse border-gray-400 rounded-lg table-fixed'>
        <thead>
          <tr>
            <th className='px-4 py-2 border border-gray-300'></th>
            {days.map((day) => (
              <th
                key={day}
                className='px-4 py-2 font-semibold text-center border border-gray-300'
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={`time-${time}-${timeIndex}`}>
              <td className='px-4 py-2 text-center border border-gray-300 text-grey'>
                {time}
              </td>
              {days.map((day, dayIndex) => {
                const course = classes.find(
                  (c) => c.day === day && c.startTime === time,
                );
                return (
                  <td
                    key={`${day}-${timeIndex}-${dayIndex}`}
                    className='relative px-4 py-2 border border-gray-300'
                    ref={tdRef} // td 요소에 ref 연결
                  >
                    {course && (
                      <div
                        className={`${flexColumn} gap-2 absolute top-0 left-0 w-full p-2 text-center text-white`}
                        style={{
                          backgroundColor: course.bgColor,
                          height: `${tdHeight * course.duration}px`,
                        }}
                      >
                        <h1>{course.title}</h1>
                        <h2>{course.place}</h2>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeTable;
