import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerNoticeAxios';
import { NoticeDetail } from '@/pages/Manager/utils/noticeAdd/NoticeInter';

export const useFetchNoticeDetail = () => {
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticeDetail = async (noticeId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/selectNoticeDtl', {
        NOTICE_IDX: noticeId,
      });
      if (response.data.status === 'success') {
        setNoticeDetail(response.data.noticeMap);
      } else {
        throw new Error(
          response.data.msg || '공지사항 상세 정보를 불러오지 못했습니다.',
        );
      }
    } catch (err: any) {
      setError(err.message || '서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { noticeDetail, fetchNoticeDetail, isLoading, error };
};
