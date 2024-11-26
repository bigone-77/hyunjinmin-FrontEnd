import { useQuery } from '@tanstack/react-query';
import { fetchUserTotalInfo } from './api';

// Notice
interface Notice {
  id: number;
  noticeDate: string;
  noticeTitle: string;
  noticeContents: string;
}

// ClassItem
interface ClassItem {
  id: number; // CLASS_SEQ
  room: number; // ROOM_IDX
  title: string; // CLASS_NAME
  teacher: string; // TEACHER_NM
  startTime: string; // 변환된 START_TIME
  endTime: string; // 변환된 END_TIME
  bgColor: string; // CLASS_COLOR
}

export const useUserTotalInfo = (
  userId: string | null,
  token: string | null,
) => {
  return useQuery({
    queryKey: ['userTotalInfo', userId],
    queryFn: () => {
      if (!userId || !token) throw new Error('Missing userId or token');
      return fetchUserTotalInfo(userId, token);
    },
    enabled: !!userId && !!token, // userId와 token이 존재할 때만 실행
    select: (data) => {
      console.log('Fetched data:', data); // API 응답 구조 확인
      return {
        schoolName: data.userInfo?.SCHL_NM || '',
        age: data.userInfo?.USER_AGE || 0,
        grade: data.userInfo?.USER_GRADE || 0,
        userId: data.userInfo?.USER_ID || '',
        name: data.userInfo?.USER_NM || '',
        badPoints: data.userInfo?.BadP || 0,
        goodPoints: data.userInfo?.GoodP || 0,
        totalPoints: data.userInfo?.totalP || 0,
        notices:
          data.noticeList?.map(
            (notice: any): Notice => ({
              id: notice.NOTICE_IDX,
              noticeDate: notice.REG_DT,
              noticeTitle: notice.NOTICE_SUBJ,
              noticeContents: notice.NOTICE_CONT,
            }),
          ) || [],
        classes:
          data.classList?.map(
            (classItem: any): ClassItem => ({
              id: classItem.CLASS_SEQ,
              room: classItem.ROOM_IDX,
              title: classItem.CLASS_NAME || '제목 없음',
              teacher: classItem.TEACHER_NM || '강사 미정',
              startTime: formatTime(classItem.START_TIME), // 시간 변환
              endTime: formatTime(classItem.END_TIME), // 시간 변환
              bgColor: classItem.CLASS_COLOR || '#ccc', // 기본 색상 설정
            }),
          ) || [],
      };
    },
  });
};

const formatTime = (time: string) => {
  if (!time || time.length !== 4) return time;
  return `${time.slice(0, 2)}:${time.slice(2)}`;
};
