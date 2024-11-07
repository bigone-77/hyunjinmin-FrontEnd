import { useState, useEffect } from 'react';
import {
  NoticeDetail,
  NoticeDetailPopupProps,
} from '@/pages/Manager/utils/noticeAdd/NoticeInter';
import { fetchNoticeDetail } from '@/pages/Manager/utils/noticeAdd/NoticeFunc';

function NoticeDetailPopup({
  isOpen,
  notice,
  onClose,
}: NoticeDetailPopupProps) {
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (notice && isOpen) {
      fetchNoticeDetail(notice.NOTICE_IDX, setNoticeDetail, setError);
    }
  }, [notice, isOpen]);

  if (!isOpen || !notice) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        {error && <p className='text-red-500'>{error}</p>}
        {noticeDetail ? (
          <>
            <h2 className='text-xl font-semibold mb-4'>
              {noticeDetail.NOTICE_SUBJ}
            </h2>
            <p className='mb-4'>{noticeDetail.NOTICE_CONT}</p>
            <p className='text-sm text-gray-500'>
              작성자: {noticeDetail.REGR_ID}
            </p>
            <p className='text-sm text-gray-500'>
              작성일: {noticeDetail.REG_DT}
            </p>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
        <button
          onClick={onClose}
          className='mt-4 bg-close text-white p-2 rounded w-full hover:bg-close-hover btn-shadow'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default NoticeDetailPopup;
