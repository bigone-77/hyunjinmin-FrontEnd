import { useState, useEffect } from 'react';
import axios from 'axios';
import { userState } from '@/recoil/atoms/user';
import { useRecoilValue } from 'recoil';

interface UserInfo {
  name: string;
  email: string;
  schoolName: string;
  age: number;
  grade: number;
  rewardPoints: number;
  panaltyPoints: number;
  totalPoints: number;
  phoneNumber: string;
  addressNumber: string;
  addressDetail: string;
}

export const useFetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useRecoilValue(userState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!userId || !accessToken) {
        setError('사용자 정보가 누락되었습니다.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          '/systemMng/user/userInfo/userDtl',
          { USER_ID: userId },
          {
            headers: { Authorization: `${accessToken}` },
          },
        );
        if (response.data.status === 'success') {
          console.log('response', response.data.userMap);

          setUserInfo({
            name: response.data.userMap.USER_NM || 'Unknown',
            email: response.data.userMap.USER_EMAIL || 'Unknown',
            schoolName: response.data.userMap.SCHL_NM || 'Unknown',
            age: response.data.userMap.USER_AGE || 0,
            grade: response.data.userMap.USER_GRADE || 0,
            rewardPoints: response.data.userMap.GoodP || 0,
            panaltyPoints: response.data.userMap.BadP || 0,
            totalPoints: response.data.userMap.totalP || 0,
            phoneNumber: response.data.userMap.PHONE_NUM || 0,
            addressNumber: response.data.userMap.USER_ADDR_NUM || 'Unknown',
            addressDetail: response.data.userMap.USER_ADDR_DTL || 'Unknown',
          });
        } else {
          throw new Error(
            response.data.msg || '사용자 정보를 불러오지 못했습니다.',
          );
        }
      } catch (err: any) {
        setError(err.message || '서버 요청 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, isLoading, error };
};
