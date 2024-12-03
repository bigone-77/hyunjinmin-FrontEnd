import { useQuery } from '@tanstack/react-query';
import { fetchClassList } from './api';

export const useClassList = (
  userId: string | null,
  token: string | null,
  isWeekend: string | null,
) => {
  const dayMapping: { [key: number]: string } = {
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
    7: '일',
  };

  const classGBMapping: { [key: number]: string } = {
    1: '국어',
    2: '수학',
    3: '영어',
    4: '과학',
  };

  return useQuery({
    queryKey: ['classList', userId, isWeekend],
    queryFn: () => {
      if (!userId || !token || !isWeekend)
        throw new Error('Missing userId or token');
      return fetchClassList(userId, token, isWeekend); // fetchClass가 배열 반환
    },
    enabled: !!userId && !!token && !!isWeekend,
    select: (data) => {
      if (!Array.isArray(data)) {
        console.warn('Data is not an array');
        return [];
      }
      return data.map((classItem: any) => {
        const startHour = parseInt(classItem.START_TIME.slice(0, 2));
        const startMinute = parseInt(classItem.START_TIME.slice(2)) / 60;
        const endHour = parseInt(classItem.END_TIME.slice(0, 2));
        const endMinute = parseInt(classItem.END_TIME.slice(2)) / 60;

        const startTime = startHour + startMinute; // 19.5 형식으로 변환
        const endTime = endHour + endMinute;
        const duration = endTime - startTime;
        return {
          id: classItem.CLASS_SEQ,
          title: classItem.CLASS_NAME || '제목 없음',
          day: [dayMapping[classItem.CLASS_DATE]],
          teacher: classItem.TEACHER_NM || '강사 미정',
          startTime: startTime,
          endTime: endTime,
          classGB: classGBMapping[classItem.ELEMENT_GB],
          duration: duration,
          place: classItem.ROOM_IDX,
          bgColor: classItem.CLASS_COLOR || '#ccc',
        };
      });
    },
  });
};
