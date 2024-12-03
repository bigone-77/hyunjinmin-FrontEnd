import AdminClassCell from './AdminClassCell';
import { TimeSlotRowProps } from './adminTimeTableInter';
import { formatTime24 } from './adminTimeTableFunc';

function AdminTimeSlotRow({
  time,
  slotIndex,
  timeSlots,
  classes,
  days,
  refetch,
}: TimeSlotRowProps & { refetch: () => void }) {
  const timeParts = time.split(':');
  const hour = parseInt(timeParts[0]);
  const minute = timeParts[1];
  const fullTime = hour + parseInt(minute) / 60;

  return (
    <tr style={{ height: '25px' }}>
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
            (cls.classDate || []).includes(day) &&
            fullTime >= cls.startTime &&
            fullTime < cls.startTime + cls.duration,
        );
        return (
          <AdminClassCell
            key={day}
            currentClass={currentClass}
            timeSlots={timeSlots}
            slotIndex={slotIndex}
            minute={minute}
            day={day}
            refetch={refetch}
          />
        );
      })}
    </tr>
  );
}

export default AdminTimeSlotRow;
