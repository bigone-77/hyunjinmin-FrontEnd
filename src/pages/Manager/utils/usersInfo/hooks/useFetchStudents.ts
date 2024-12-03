import { useState, useEffect } from 'react';
import axiosInstance from '../../../hooks/useManagerAxios';
import { Student } from '../StudentInter'; // Student 타입 정의

export const useFetchStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  let alertShown = false; // 한 번만 alert를 표시하기 위한 플래그

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/userInfo', { USER_NM: '' });

      if (response.data.status === 'success') {
        console.log('data', response.data);
        const studentsData = response.data.dl_userList.map((user: any) => ({
          id: user.USER_ID,
          name: user.USER_NM,
          age: user.USER_AGE,
          email: user.USER_EMAIL,
          phoneNumber: user.PHONE_NUM,
          schoolName: user.SCHL_NM,
          postalCode: user.USER_ADDR_NUM,
          address: user.USER_ADDR_DTL,
          rewardPoints: user.GoodP,
          penaltyPoints: user.BadP,
          totalPoints: user.totalP,
        }));
        setStudents(studentsData);
        setFilteredStudents(studentsData);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다' && !alertShown) {
          alertShown = true;
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        }
        throw new Error(
          response.data.msg || '학생 정보를 불러오지 못했습니다.',
        );
      }
    } catch (error: any) {
      setError(error.message || '학생 정보를 가져오는 중 오류가 발생했습니다.');
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  return { students, filteredStudents, setFilteredStudents, isLoading, error };
};
