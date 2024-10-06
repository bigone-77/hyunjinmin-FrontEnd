import { useState } from 'react';
import PopUp from './PopUp';
import { formatTime24to12 } from './Utils/TimeUtils';
interface ClassCellProps {
  currentClass: any;
  timeSlots: string[];
  slotIndex: number;
  minute: string;
  day: string;
}

const ClassCell = ({
  currentClass,
  timeSlots,
  slotIndex,
  minute,
}: ClassCellProps) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  if (!currentClass) {
    return (
      <td
        className={`p-0.5 text-center border-x border-gray-300 ${minute === '00' ? 'border-t' : 'border-t-0 border-b-0'}`}
        style={{ backgroundColor: 'transparent' }}
      ></td>
    );
  }

  const startTime = formatTime24to12(
    Math.floor(currentClass.startTime),
    currentClass.startTime % 1 === 0.5 ? 30 : 0,
  );

  const endTime = formatTime24to12(
    Math.floor(currentClass.startTime + currentClass.duration),
    Math.round(((currentClass.startTime + currentClass.duration) % 1) * 60),
  );

  return (
    <td
      className={`p-0.5 text-center border-x border-gray-300 ${minute === '00' ? 'border-t' : 'border-t-0 border-b-0'}`}
      style={{
        backgroundColor: currentClass.bgColor,
        fontSize: '10px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => setIsPopUpOpen(true)}
    >
      {slotIndex ===
        timeSlots.indexOf(
          `${Math.floor(currentClass.startTime)}:${currentClass.startTime % 1 === 0.5 ? '30' : '00'}`,
        ) && `${currentClass.title}`}
      {slotIndex ===
        timeSlots.indexOf(
          `${Math.floor(currentClass.startTime)}:${currentClass.startTime % 1 === 0.5 ? '30' : '00'}`,
        ) +
          1 && `${startTime} ~`}
      {slotIndex ===
        timeSlots.indexOf(
          `${Math.floor(currentClass.startTime)}:${currentClass.startTime % 1 === 0.5 ? '30' : '00'}`,
        ) +
          2 && `${endTime}`}
      {isPopUpOpen && (
        <PopUp classInfo={currentClass} onClose={() => setIsPopUpOpen(false)} />
      )}
    </td>
  );
};

export default ClassCell;
