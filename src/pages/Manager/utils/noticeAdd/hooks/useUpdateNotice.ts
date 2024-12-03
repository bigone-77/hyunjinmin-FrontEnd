import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerNoticeAxios';
import { Notice } from '@/pages/Manager/utils/noticeAdd/NoticeInter';

export const useUpdateNotice = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateNotice = async (updatedNotice: Notice) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/updateNoticeDtl', {
        NOTICE_IDX: updatedNotice.NOTICE_IDX,
        NOTICE_SUBJ: updatedNotice.NOTICE_SUBJ,
        NOTICE_CONT: updatedNotice.NOTICE_CONT,
      });
      if (response.data.status !== 'success') {
        throw new Error(response.data.msg || '수정에 실패했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateNotice, isUpdating, error };
};
