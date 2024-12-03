import { useState } from 'react';
import axios from 'axios';

export const useChangeInfo = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const changeInfo = async (updatedInfo: {
    email: string;
    age: number;
    grade: number;
    schoolLevel: number;
    schoolCD: string;
    phoneNumber: string;
    addressNumber: string;
    addressDetail: string;
  }) => {
    setIsUpdating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        '/systemMng/user/userInfo/updateUserInfo',
        updatedInfo,
        {
          headers: {
            Authorization: localStorage.getItem('accessToken') || '',
          },
        },
      );

      if (response.data.status === 'success') {
        setSuccessMessage('정보가 성공적으로 변경되었습니다.');
        alert('정보가 성공적으로 변경되었습니다.');
      } else {
        throw new Error(response.data.msg || '정보 변경에 실패했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return { changeInfo, isUpdating, error, successMessage };
};
