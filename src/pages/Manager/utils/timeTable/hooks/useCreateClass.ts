import { useState } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerClassAxios';

export const useCreateClass = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createClass = async (classData: Record<string, any>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/insertClass', classData);

      if (response.data.status === 'success') {
        setMessage(response.data.msg || '성공적으로 저장되었습니다.');
      } else {
        setMessage(response.data.msg || '오류가 발생했습니다.');
        setError(response.data.msg);
      }
    } catch (error: any) {
      console.error('Error:', error);
      setMessage('서버 요청 중 오류가 발생했습니다.');
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { createClass, message, isLoading, error };
};
