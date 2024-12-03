import { useState } from 'react';
import axiosInstance from '../../../hooks/useManagerClassAxios';

export const useTimeTableYN = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTimeTableYN = async (classSeq: number, useYN: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const UPT_TYPE = useYN === 'Y' ? 'N' : 'Y';

      const response = await axiosInstance.post('/updateUserdYn', {
        CLASS_MAIN_SEQ: classSeq,
        UPT_TYPE,
      });

      console.log('UPT_TYPE', UPT_TYPE);
      if (response.data.status === 'success') {
        console.log('사용 여부가 성공적으로 변경되었습니다.');
      } else {
        throw new Error(response.data.msg || '사용 여부 변경에 실패했습니다.');
      }
    } catch (error: any) {
      setError(error.message || '사용 여부 변경 중 오류가 발생했습니다.');
      console.error('Error updating time table YN:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { toggleTimeTableYN, isLoading, error };
};
