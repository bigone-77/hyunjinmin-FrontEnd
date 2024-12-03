import { useState, useEffect } from 'react';
import axiosInstance from '../../../hooks/useManagerClassAxios';
import { Teacher } from '../TeacherInter';

export const useFetchTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/selectTeacherList');
      if (response.data.status === 'success') {
        const teachersData = response.data.teacherList.map((teacher: any) => ({
          id: teacher.TEACHER_SEQ,
          subject: teacher.ELEMENT_GB,
          name: teacher.TEACHER_NM,
        }));
        setTeachers(teachersData);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
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
    fetchTeachers(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  return { teachers, isLoading, error, fetchTeachers };
};
