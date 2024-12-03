import { NoticeDetailPopupProps } from '@/pages/Manager/utils/noticeAdd/NoticeInter';

function NoticeDetailPopup({
  isOpen,
  notice,
  onClose,
  isLoading,
  error,
}: NoticeDetailPopupProps & { isLoading: boolean; error: string | null }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        {isLoading && <p>로딩 중...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {!isLoading && notice && (
          <>
            <h2 className='text-xl font-semibold mb-4'>{notice.NOTICE_SUBJ}</h2>
            <p className='mb-4'>{notice.NOTICE_CONT}</p>
            <p className='text-sm text-gray-500'>작성자: {notice.REGR_ID}</p>
            <p className='text-sm text-gray-500'>작성일: {notice.REG_DT}</p>
          </>
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
