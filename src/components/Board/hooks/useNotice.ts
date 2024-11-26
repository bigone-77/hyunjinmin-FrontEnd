import { useQuery } from '@tanstack/react-query';
import { fetchNotices } from './api';

import { Notice } from '@/components/Board/Utils/NoticeInter';

export const useNotice = (token: string | null) => {
  return useQuery<Notice[]>({
    queryKey: ['notices'],
    queryFn: () => {
      if (!token) throw new Error('Missing token');
      return fetchNotices(token);
    },
    enabled: !!token,
    select: (data) =>
      data.map(
        (notice: any): Notice => ({
          id: notice.NOTICE_IDX,
          noticeDate: notice.REG_DT,
          noticeTitle: notice.NOTICE_SUBJ,
          noticeContents: notice.NOTICE_CONT,
        }),
      ),
  });
};
