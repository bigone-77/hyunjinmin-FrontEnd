import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerClassAxios';

export const useInsertTimeTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertTimeTable = async (
    className: string,
    schoolCode: string,
    selectedGrade: number | '',
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/insertMainClass', {
        CLASS_TYPE_NAME: className,
        USE_YN: 'Y',
        SCHL_CD: schoolCode,
        GRADE: selectedGrade,
      });

      if (response.data.status === 'success') {
        alert(response.data.msg || '시간표가 성공적으로 추가되었습니다.');
        return true; // 성공 반환
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        } else {
          alert(response.data.msg || '시간표 추가에 실패했습니다.');
        }
        return false; // 실패 반환
      }
    } catch (err) {
      console.error('Error inserting main class:', err);
      setError('서버 요청 중 오류가 발생했습니다.');
      alert('서버 요청 중 오류가 발생했습니다.');
      return false; // 실패 반환
    } finally {
      setIsLoading(false);
    }
  };

  return { insertTimeTable, isLoading, error };
};
