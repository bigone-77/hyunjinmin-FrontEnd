import { useQuery } from '@tanstack/react-query';
import { fetchUserDetails } from './api';

export const useUserDetail = (userId: string | null, token: string | null) => {
  return useQuery({
    queryKey: ['userDetail', userId],
    queryFn: () => {
      if (!userId || !token) throw new Error('Missing userId or token');
      return fetchUserDetails(userId, token);
    },
    enabled: !!userId && !!token, // userId와 token이 존재할 때만 실행
    select: (data) => ({
      schoolName: data.SCHL_NM,
      age: data.USER_AGE,
      grade: data.USER_GRADE,
      userId: data.USER_ID,
      name: data.USER_NM,
      badPoints: data.BadP,
      goodPoints: data.GoodP,
      totalPoints: data.totalP,
    }),
  });
};
