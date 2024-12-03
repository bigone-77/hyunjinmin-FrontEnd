import { useState, useEffect } from 'react';
import axiosInstance from '@/pages/Manager/hooks/useManagerPointAxios';
import { StudentPoints } from '@/pages/Manager/utils/points/PointsInter';

export const useStudentPoints = () => {
  const [students, setStudents] = useState<StudentPoints[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentPoints[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentPoints = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/selectUserPoint', {});
      if (response.data.status === 'success') {
        console.log('data', response.data);
        const studentsData = response.data.rtnList.map((student: any) => ({
          id: student.USER_ID,
          name: student.USER_NM,
          age: student.USER_AGE,
          school: student.SCHL_NM,
          rewardPoints: student.GoodP,
          penaltyPoints: student.BadP,
          totalPoints: student.totalP,
        }));
        setStudents(studentsData);
        setFilteredStudents(studentsData);
      } else {
        setError(response.data.msg || '데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching student points:', error);
      setError('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentPoints();
  }, []);

  return { students, filteredStudents, setFilteredStudents, isLoading, error };
};
