import { useState, useEffect } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerNoticeAxios';
import { Notice } from '@/pages/Manager/utils/noticeAdd/NoticeInter';

export const useFetchNotices = (searchTerm: string = '') => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/selectList', {
        SEARCH_KEYWORD: searchTerm, // 검색어를 서버에 전달
      });
      if (response.data.status === 'success') {
        setNotices(response.data.noticeList);
      } else {
        throw new Error(response.data.msg || '공지사항을 불러오지 못했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // `searchTerm`의 변화에 따라 데이터를 가져옴
  useEffect(() => {
    fetchNotices();
  }, [searchTerm]);

  return { notices, isLoading, error, refetch: fetchNotices };
};
