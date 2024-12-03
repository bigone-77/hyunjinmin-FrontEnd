import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerNoticeAxios';

export const useSubmitNewNotice = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submitNewNotice = async (
    noticeTitle: string,
    noticeContent: string,
    handleClose: () => void,
  ) => {
    setIsSubmitting(true);
    setMessage(null);
    try {
      const response = await axiosInstance.post('/insertNoticeDtl', {
        NOTICE_SUBJ: noticeTitle,
        NOTICE_CONT: noticeContent,
      });
      if (response.data.status === 'success') {
        alert('공지사항이 성공적으로 추가되었습니다.');
        handleClose();
      } else {
        throw new Error(response.data.msg || '공지사항 추가에 실패했습니다.');
      }
    } catch (err: any) {
      setMessage(err.message || '서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitNewNotice, isSubmitting, message };
};
