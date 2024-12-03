import { useState } from 'react';
import axiosInstance from '../../../hooks/useManagerClassAxios';
import { Class } from '@/pages/Manager/utils/timeTable/adminTimeTableInter';
import { dayNumberToString } from '@/pages/Manager/utils/timeTable/adminTimeTableFunc';

export const useFetchClasses = () => {
  const [timeTableData, setTimeTableData] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClasses = async (selectedResult: string, isWeekend: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/classList', {
        CLASS_MAIN_SEQ: selectedResult,
        DAY_GB: isWeekend ? '주말' : '평일',
      });

      if (response.data.status === 'success') {
        const classListData = response.data.dl_classList.map(
          (classItem: any) => {
            const startHour = parseInt(classItem.START_TIME.slice(0, 2));
            const startMinute = parseInt(classItem.START_TIME.slice(2)) / 60;
            const endHour = parseInt(classItem.END_TIME.slice(0, 2));
            const endMinute = parseInt(classItem.END_TIME.slice(2)) / 60;

            const startTime = startHour + startMinute;
            const endTime = endHour + endMinute;
            const duration = endTime - startTime;

            return {
              classSeq: classItem.CLASS_SEQ,
              teacherName: classItem.TEACHER_NM,
              className: classItem.CLASS_NAME,
              startTime: startTime,
              endTime: endTime,
              duration: duration,
              roomIndex: classItem.ROOM_IDX.toString(),
              price: classItem.PRICE,
              schoolName: classItem.SCHL_NM,
              grade: classItem.GRADE,
              regDate: classItem.REG_DT,
              classColor: `${classItem.CLASS_COLOR}`,
              classDate: dayNumberToString(classItem.CLASS_DATE),
            };
          },
        );
        setTimeTableData(classListData);
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        }
        throw new Error(
          response.data.msg || '시간표 데이터를 가져오지 못했습니다.',
        );
      }
    } catch (error: any) {
      console.error('Error fetching timetable data:', error);
      setError(error.message || '데이터 가져오기 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { timeTableData, fetchClasses, isLoading, error };
};
