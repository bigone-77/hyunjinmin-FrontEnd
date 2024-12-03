import { useState } from 'react';
import axiosInstance from '../../../hooks/useManagerClassAxios';

interface ClassDetail {
  className: string; // 변경
  teacherName: string; // 변경
  roomIndex: string; // 변경
  classSeq: number; // 변경
  startTime: number; // 변경
  endTime: number; // 변경
  regDate: string; // 변경
}

export const useFetchClassDetails = () => {
  const [classDetails, setClassDetails] = useState<ClassDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClassDetails = async (classSeq: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/classDtl', {
        CLASS_SEQ: classSeq,
      });

      if (response.data.status === 'success') {
        const rawData = response.data.dl_classMap;

        const transformedData: ClassDetail = {
          classSeq: rawData.CLASS_SEQ,
          teacherName: rawData.TEACHER_NM,
          className: rawData.CLASS_NAME,
          startTime: rawData.START_TIME,
          endTime: rawData.END_TIME,
          roomIndex: rawData.ROOM_IDX,
          regDate: rawData.REG_DT,
        };

        setClassDetails(transformedData);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
          return;
        }
        setError(response.data.msg || '오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error('Error fetching class details:', err);
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { classDetails, fetchClassDetails, isLoading, error };
};
