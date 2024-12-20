import ClassCell from './ClassCell';
import { formatTime24 } from './Utils/TimeUtils';
import { TimeSlotRowProps } from './Utils/TimeTableIF';

function TimeSlotRow({
  time,
  slotIndex,
  timeSlots,
  classes,
  days,
}: TimeSlotRowProps) {
  const timeParts = time.split(':');
  const hour = parseInt(timeParts[0]);
  const minute = timeParts[1];
  const fullTime = hour + parseInt(minute) / 60;
  return (
    <tr key={time} style={{ height: '25px' }}>
      <td
        className={`p-0.5 text-center align-middle border-x border-gray-300 font-semibold bg-gray-200 ${
          minute === '00' ? 'border-t' : 'border-t-0 border-b-0'
        }`}
        style={{ fontSize: '10px' }}
      >
        {minute === '00' ? formatTime24(hour, minute) : ''}
      </td>
      {days.map((day) => {
        const currentClass = classes.find(
          (cls) =>
            cls.day.includes(day) &&
            fullTime >= cls.startTime &&
            fullTime < cls.startTime + cls.duration,
        );
        return (
          <ClassCell
            key={day}
            currentClass={currentClass}
            timeSlots={timeSlots}
            slotIndex={slotIndex}
            minute={minute}
            day={day}
          />
        );
      })}
    </tr>
  );
}

export default TimeSlotRow;
