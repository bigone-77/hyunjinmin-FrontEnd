import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatTime24to12 } from './adminTimeTableInter';
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
  const [deleteMessage, setDeleteMessage] = useState('');

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
              Authorization: `${accessToken}`,
            },
          },
        );
        console.log('API response:', response.data);

        if (response.data.status === 'success') {
          if (response.data.msg === '유효하지 않은 토큰입니다') {
            alert('다시 로그인을 해주세요.');
            window.location.href = '/manager/auth/adminLogin';
          }
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

  const handleDelete = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        '/systemMng/admin/classMng/deleteClass',
        { CLASS_SEQ: classInfo.classSeq },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        },
      );

      if (response.data.status === 'success') {
        alert('성공적으로 삭제되었습니다.');
        onClose();
      } else {
        setDeleteMessage(response.data.msg || '삭제 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('Error deleting class:', err);
      setDeleteMessage('서버 요청 중 오류가 발생했습니다.');
    }
  };

  const formatKoreanDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? '오전' : '오후';

    return `${year}년${month}월${day}일 ${period} ${formattedHours}시${minutes}분`;
  };

  //수업 진행시간 구하기
  const calculateDuration = (startTimeStr: string, endTimeStr: string) => {
    const startHours = parseInt(startTimeStr.substring(0, 2), 10);
    const startMinutes = parseInt(startTimeStr.substring(2), 10);

    const endHours = parseInt(endTimeStr.substring(0, 2), 10);
    const endMinutes = parseInt(endTimeStr.substring(2), 10);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    const durationMinutes = endTotalMinutes - startTotalMinutes;

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}시간 ${minutes}분`;
  };

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

  const durationFormatted = calculateDuration(
    classDetails.START_TIME.toString(),
    classDetails.END_TIME.toString(),
  );
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='bg-white p-4 rounded-2xl shadow-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>{classDetails.CLASS_NAME}</h2>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>선생님:</strong> {classDetails.TEACHER_NM}
        </p>
        <p className='pb-2 pl-2 text-sm font-semibold text-start'>
          <strong>강의실:</strong> {classDetails.ROOM_IDX}번 강의실
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
          <strong>등록일:</strong> {formatKoreanDateTime(classDetails.REG_DT)}
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
