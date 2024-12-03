import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerClassAxios';

export const useDeleteTeacher = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTeacher = async (teacherId: number) => {
    setIsDeleting(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/deleteTeacher', {
        TEACHER_SEQ: teacherId,
      });
      if (response.data.status !== 'success') {
        throw new Error(response.data.msg || '삭제에 실패했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteTeacher, isDeleting, error };
};
