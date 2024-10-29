import { useState } from 'react';
import PopUp from './PopUp';
import { ClassCellProps } from '@/components/Table/Utils/TimeTableIF';

function ClassCell({
  currentClass,
  timeSlots,
  slotIndex,
  minute,
}: ClassCellProps) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  if (!currentClass) {
    return (
      <td
        className={`p-0.5 text-center border-x border-gray-300 ${minute === '00' ? 'border-t' : 'border-t-0 border-b-0'}`}
        style={{ backgroundColor: 'transparent', borderSpacing: 0 }}
      ></td>
    );
  }

  return (
    <td
      className={`p-0.5 text-center border-x border-gray-300 ${minute === '00' ? 'border-t' : 'border-t-0 border-b-0'}`}
      style={{
        backgroundColor: currentClass.bgColor,
        fontSize: '10px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => setIsPopUpOpen(true)}
    >
      {slotIndex ===
        timeSlots.indexOf(
          `${Math.floor(currentClass.startTime)}:${currentClass.startTime % 1 === 0.5 ? '30' : '00'}`,
        ) && (
        <span className='absolute top-2 left-0 right-0 mx-auto'>
          {currentClass.title}
        </span>
      )}

      {isPopUpOpen && (
        <PopUp classInfo={currentClass} onClose={() => setIsPopUpOpen(false)} />
      )}
    </td>
  );
}

export default ClassCell;
