import { useQuery } from '@tanstack/react-query';
import { fetchClassList } from './api';

export const useClassList = (userId: string | null, token: string | null) => {
  return useQuery({
    queryKey: ['classList', userId],
    queryFn: () => {
      if (!userId || !token) throw new Error('Missing userId or token');
      return fetchClassList(userId, token); // fetchClassList가 배열 반환
    },
    enabled: !!userId && !!token,
    select: (data) => {
      console.log('Raw data in select:', data); // 배열인지 확인
      if (!Array.isArray(data)) {
        console.warn('Data is not an array');
        return [];
      }
      return data.map((classItem: any) => ({
        id: classItem.CLASS_SEQ,
        room: classItem.ROOM_IDX,
        title: classItem.CLASS_NAME || '제목 없음',
        teacher: classItem.TEACHER_NM || '강사 미정',
        startTime: formatTime(classItem.START_TIME),
        endTime: formatTime(classItem.END_TIME),
        bgColor: classItem.CLASS_COLOR || '#ccc',
      }));
    },
  });
};

const formatTime = (time: string) => {
  if (!time || time.length !== 4) return time;
  return `${time.slice(0, 2)}:${time.slice(2)}`;
};
