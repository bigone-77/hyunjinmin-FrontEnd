import { useEffect } from 'react';
import {
  formatTime24to12,
  formatKoreanDateTime,
  calculateDuration,
} from './adminTimeTableFunc';
import { PopUpProps } from './adminTimeTableInter';

import { useFetchClassDetails } from '@/pages/Manager/utils/timeTable/hooks/useFetchClassDetail';
import { useDeleteClass } from '@/pages/Manager/utils/timeTable/hooks/useDeleteClass';
import Spacing from '@/components/shared/Spacing';

function AdminPopUp({
  classInfo,
  onClose,
  refetch,
}: PopUpProps & { refetch: () => void }) {
  const { classDetails, fetchClassDetails, isLoading, error } =
    useFetchClassDetails();
  const { deleteClass, deleteMessage } = useDeleteClass();

  const handleDelete = () => {
    deleteClass(classInfo.classSeq, onClose, refetch);
  };

  useEffect(() => {
    fetchClassDetails(classInfo.classSeq); // 클래스 상세 정보를 가져오기
  }, [classInfo.classSeq]);

  if (!classDetails) return null;

  const startTimeFormatted = formatTime24to12(
    Math.floor(classDetails.startTime / 100),
    classDetails.startTime % 100,
  );
  const endTimeFormatted = formatTime24to12(
    Math.floor(classDetails.endTime / 100),
    classDetails.endTime % 100,
  );

  const durationFormatted = calculateDuration(
    classDetails.startTime.toString(),
    classDetails.endTime.toString(),
  );

  if (isLoading) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
        <div className='bg-white p-4 rounded-2xl shadow-lg w-80'>
          <p>불러오는 중...</p>
          {error && <p className='text-red-500'>{error}</p>}
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

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='bg-white p-4 rounded-2xl shadow-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>{classDetails.className}</h2>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>선생님:</strong> {classDetails.teacherName} 쌤
        </p>
        <Spacing size={4} />
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>강의실:</strong> {classDetails.roomIndex}번 강의실
        </p>
        <Spacing size={4} />
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>시작 시간:</strong> {startTimeFormatted}
        </p>
        <Spacing size={4} />
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>종료 시간:</strong> {endTimeFormatted}
        </p>
        <Spacing size={4} />
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>수업 시간:</strong> {durationFormatted}
        </p>
        <Spacing size={4} />
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>등록일:</strong> {formatKoreanDateTime(classDetails.regDate)}
        </p>

        <button
          className='mt-4 border bg-negative text-white px-4 py-2 rounded-xl font-semibold hover:bg-negative-hover w-1/3 btn-shadow mr-5'
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          삭제
        </button>

        {deleteMessage && <p className='text-red-500 mt-2'>{deleteMessage}</p>}

        <button
          className='mt-4 bg-close text-white px-4 py-2 rounded-xl font-semibold hover:bg-close-hover btn-shadow w-1/3'
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

export default AdminPopUp;
