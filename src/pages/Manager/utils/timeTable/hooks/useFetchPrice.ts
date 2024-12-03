import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerClassAxios';
import { classGBMap, userSchoolLevel } from '@/utils/getCode';

export const useFetchPrice = () => {
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async (
    classGB: string,
    grade: string,
    schoolLevel: string,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/selectElementMap', {
        ELEMENT_GB: classGBMap[classGB],
        GRADE: grade,
        SCHL_LV: userSchoolLevel[schoolLevel],
      });

      if (response.data.status === 'success') {
        setPrice(response.data.ElementMap.PRICE || '');
        setMessage(response.data.msg || '가격이 성공적으로 설정되었습니다.');
      } else {
        setMessage(response.data.msg || '오류가 발생했습니다.');
        setError(response.data.msg);
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { price, fetchPrice, message, isLoading, error };
};
