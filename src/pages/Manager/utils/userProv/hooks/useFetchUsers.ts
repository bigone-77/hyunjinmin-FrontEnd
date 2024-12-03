import { useState, useEffect } from 'react';
import axiosInstance from '../../../hooks/useManagerAxios';
import { User } from '../UserProvInter';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/userProv', { USER_NM: '' });

      if (response.data.status === 'success') {
        const usersData = response.data.dl_userList.map((user: any) => ({
          id: user.USER_ID,
          name: user.USER_NM,
          age: user.USER_AGE,
          email: user.USER_EMAIL,
          phoneNumber: user.PHONE_NUM,
          schoolName: user.SCHL_NM,
          postalCode: user.USER_ADDR_NUM,
          address: user.USER_ADDR_DTL,
        }));
        setUsers(usersData);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        } else {
          setError(response.data.msg || '정보를 불러오는데 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('서버 요청 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error };
};
