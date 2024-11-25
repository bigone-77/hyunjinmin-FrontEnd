import { formatTime24to12, formatDuration } from './Utils/TimeUtils';
import { PopUpProps } from './Utils/TimeTableIF';

function PopUp({ classInfo, onClose }: PopUpProps) {
  if (!classInfo) return null;

  const startTimeFormatted = formatTime24to12(
    Math.floor(classInfo.startTime),
    classInfo.startTime % 1 === 0.5
      ? 30
      : classInfo.startTime % 1 === 0.75
        ? 45
        : 0,
  );

  const endTimeFormatted = formatTime24to12(
    Math.floor(classInfo.endTime),
    classInfo.endTime % 1 === 0.5
      ? 30
      : classInfo.endTime % 1 === 0.75
        ? 45
        : 0,
  );

  const durationFormatted = formatDuration(classInfo.duration);
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='bg-white p-4 rounded-2xl shadow-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>{classInfo.title}</h2>
        <p className='pb-2 text-sm font-semibold'>
          <strong>선생님:</strong> {classInfo.teacher}
        </p>
        <p className='pb-2 text-sm font-semibold'>
          <strong>과목 :</strong> {classInfo.classGB}
        </p>
        <p className='pb-2 text-sm font-semibold'>
          <strong>강의실:</strong> {classInfo.place}강의실
        </p>
        <p className='pb-2 text-sm font-semibold'>
          <strong>수업 시작 시간:</strong> {startTimeFormatted}
        </p>
        <p className='pb-2 text-sm font-semibold'>
          <strong>수업 종료 시간:</strong> {endTimeFormatted}
        </p>
        <p className='text-sm font-semibold'>
          <strong>수업 시간:</strong> {durationFormatted}
        </p>
        <button
          className='mt-4 border border-black text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200'
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default PopUp;
