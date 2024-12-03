import { useState, useEffect } from 'react';
import axiosInstance from '../../../hooks/useManagerClassAxios';
import { Teacher } from '@/pages/Manager/utils/teacher/TeacherInter';
import { classGBMap } from '@/utils/getCode';

export const useTeacherSelect = ({ subject }: { subject: string }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const teacherSelect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        '/selectTeacherListByElementGB',
        { ELEMENT_GB: classGBMap[subject] },
      );

      if (Array.isArray(response.data.result)) {
        const teachersData = response.data.result.map((teacher: any) => ({
          id: teacher.TEACHER_SEQ,
          subject: teacher.ELEMENT_GB,
          name: teacher.TEACHER_NM,
        }));
        setTeachers(teachersData);
        console.log('teachersData', teachersData);
      } else {
        throw new Error('올바른 응답 형식이 아닙니다.');
      }
    } catch (error: any) {
      setError(
        error.message || '선생님 정보를 가져오는 중 오류가 발생했습니다.',
      );
      console.error('Error fetching teacher data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    teacherSelect(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  return { teachers, isLoading, error, teacherSelect };
};
