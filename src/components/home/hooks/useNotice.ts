import { useQuery } from '@tanstack/react-query';
import { fetchNotices } from './api';

export const useNotice = (token: string | null) => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: () => {
      if (!token) throw new Error('Missing token');
      return fetchNotices(token);
    },
    enabled: !!token, // token이 존재할 때만 실행
    select: (data) =>
      data.map((notice: any) => ({
        id: notice.NOTICE_IDX,
        noticeDate: notice.REG_DT,
        noticeTitle: notice.NOTICE_SUBJ,
        noticeContents: notice.NOTICE_CONT,
      })),
  });
};
