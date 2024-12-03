import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerNoticeAxios';

export const useDeleteNotice = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteNotice = async (noticeId: number) => {
    setIsDeleting(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/deleteNoticeDtl', {
        NOTICE_IDX: noticeId,
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

  return { deleteNotice, isDeleting, error };
};
