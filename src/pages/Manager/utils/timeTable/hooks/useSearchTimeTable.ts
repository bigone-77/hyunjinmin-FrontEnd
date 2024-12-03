import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerClassAxios';

interface SearchResult {
  CLASS_MAIN_SEQ: string;
  CLASS_TYPE_NAME: string;
  USE_YN: string;
}

export const useSearchTimeTalbe = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTimeTable = async (schoolCode: string, grade: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/selectMainClassSeq', {
        SCHL_CD: schoolCode,
        GRADE: grade,
      });

      if (response.data.status === 'success') {
        setSearchResults(response.data.selectList || []);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        }
        setError(response.data.msg || '검색에 실패했습니다.');
      }
    } catch (err: any) {
      console.error('Error searching TimeTalbe:', err);
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { searchResults, searchTimeTable, isLoading, error };
};
