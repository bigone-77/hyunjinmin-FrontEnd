import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerClassAxios';

export const useInsertTeacher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const insertTeacher = async (
    name: string,
    subject: string,
    handleClose: () => void,
  ) => {
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await axiosInstance.post('/insertTeacher', {
        TEACHER_NM: name,
        ELEMENT_GB: subject,
      });
      if (response.status === 200) {
        if (response.data.status === 'error') {
          throw new Error(response.data.msg || '추가 실패');
        }

        // 성공 처리
        alert('선생님 추가가 완료되었습니다.');
        handleClose(); // 팝업 닫기
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    } catch (error: any) {
      setMessage(error.message || '서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { insertTeacher, isLoading, message };
};
