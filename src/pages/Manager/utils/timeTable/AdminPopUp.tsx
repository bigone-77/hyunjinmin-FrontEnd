// import { formatTime24to12, formatDuration } from './adminTimeTableInter';
// import { PopUpProps } from './adminTimeTableInter';

// function AdminPopUp({ classInfo, onClose }: PopUpProps) {
//   if (!classInfo) return null;

//   const startTimeFormatted = formatTime24to12(
//     Math.floor(classInfo.startTime),
//     classInfo.startTime % 1 === 0.5 ? 30 : 0,
//   );

//   const durationFormatted = formatDuration(classInfo.duration);

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
//       <div className='bg-white p-4 rounded-2xl shadow-lg w-80'>
//         <h2 className='text-xl font-bold mb-4'>{classInfo.title}</h2>
//         <p className='pb-2 text-sm font-semibold'>
//           <strong>강의실:</strong> {classInfo.place}
//         </p>
//         <p className='pb-2 text-sm font-semibold'>
//           <strong>시작 시간:</strong> {startTimeFormatted}
//         </p>
//         <p className='text-sm font-semibold'>
//           <strong>수업 시간:</strong> {durationFormatted}
//         </p>
//         <button
//           className='mt-4 border border-black text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200'
//           onClick={(e) => {
//             e.stopPropagation();
//             onClose();
//           }}
//         >
//           닫기
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminPopUp;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatTime24to12, formatDuration } from './adminTimeTableInter';
import { PopUpProps } from './adminTimeTableInter';

interface ClassDetail {
  CLASS_SEQ: number;
  TEACHER_NM: string;
  CLASS_NAME: string;
  START_TIME: number;
  END_TIME: number;
  ROOM_IDX: string;
  PRICE: number;
  SCHL_CD: string;
  SCHL_NM: string;
  GRADE: string;
  REG_DT: string;
  CLASS_COLOR: string;
  CLASS_DATE: string[];
}

function AdminPopUp({ classInfo, onClose }: PopUpProps) {
  const [classDetails, setClassDetails] = useState<ClassDetail | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassDetails = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.post(
          '/systemMng/admin/classMng/classDtl',
          {
            CLASS_SEQ: classInfo.classSeq,
          },
          {
            headers: {
              Authorization: `${accessToken}`, //localStrage에 저장된 JWT accessToken사용
            },
          },
        );
        console.log('CLASS_SEQ:', classInfo.classSeq);
        console.log('API response:', response.data);

        if (response.data.status === 'success') {
          setClassDetails(response.data.dl_classMap);
        } else {
          setError(response.data.msg || '오류가 발생했습니다.');
        }
      } catch (err) {
        console.error('Error fetching class details:', err);
        setError('서버 요청 중 오류가 발생했습니다.');
      }
    };

    fetchClassDetails();
  }, [classInfo.classSeq]);

  if (!classDetails) {
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

  const startTimeFormatted = formatTime24to12(
    Math.floor(classDetails.START_TIME / 100),
    classDetails.START_TIME % 100,
  );
  const endTimeFormatted = formatTime24to12(
    Math.floor(classDetails.END_TIME / 100),
    classDetails.END_TIME % 100,
  );
  const durationFormatted = formatDuration(
    (classDetails.END_TIME - classDetails.START_TIME) / 100,
  );

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='bg-white p-4 rounded-2xl shadow-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>{classDetails.CLASS_NAME}</h2>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>선생님:</strong> {classDetails.TEACHER_NM}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>강의실:</strong> {classDetails.ROOM_IDX}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>시작 시간:</strong> {startTimeFormatted}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>종료 시간:</strong> {endTimeFormatted}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>수업 시간:</strong> {durationFormatted}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>가격:</strong> {classDetails.PRICE}원
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>학교:</strong> {classDetails.SCHL_NM}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>학년:</strong> {classDetails.GRADE}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>등록일:</strong> {classDetails.REG_DT}
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

export default AdminPopUp;
