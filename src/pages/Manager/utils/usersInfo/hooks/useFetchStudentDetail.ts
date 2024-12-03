import { useState, useEffect } from 'react';
import axiosInstance from '../../../hooks/useManagerAxios';
import { StudentDetail } from '../StudentInter'; // StudentDetail 타입 정의

export const useFetchStudentDetail = (studentId: string | null) => {
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) return; // studentId가 없으면 요청하지 않음

    const fetchStudentDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post('/userInfoDtl', {
          USER_ID: studentId,
        });
        console.log('response', response.data);
        if (response.data.status === 'success') {
          const user = response.data.userMap; // 단일 학생 정보

          const studentData: StudentDetail = {
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
            classes: user.ELEMENT_NM,
            totalPrice: user.TOTAL_PRICE,
          };
          setStudent(studentData);
        } else {
          throw new Error(
            response.data.msg || '학생 세부 정보를 불러오지 못했습니다.',
          );
        }
      } catch (error: any) {
        setError(
          error.message || '학생 정보를 가져오는 중 오류가 발생했습니다.',
        );
        console.error('Error fetching student detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentDetail();
  }, [studentId]);

  return { student, isLoading, error };
};
