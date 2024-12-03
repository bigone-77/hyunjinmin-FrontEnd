import { useState } from 'react';
import { Notice } from './NoticeInter';
import { useDeleteNotice } from '@/pages/Manager/utils/noticeAdd/hooks/useDeleteNotice';
import { useFetchNoticeDetail } from '@/pages/Manager/utils/noticeAdd/hooks/useFetchNoticeDetail';

import NoticeAddPopup from './NoticeAddPopup';
import NoticeDetailPopup from './NoticeDetailPopup';
import NoticeEditPopup from './NoticeEditPopup';

interface NoticeListProps {
  notices: Notice[];
  refetch: () => void;
}

function NoticeList({ notices, refetch }: NoticeListProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const { deleteNotice, isDeleting, error } = useDeleteNotice();

  const {
    noticeDetail,
    fetchNoticeDetail,
    isLoading: isFetchingDetail,
    error: detailError,
  } = useFetchNoticeDetail();

  const handleDelete = async (noticeId: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      await deleteNotice(noticeId); // 삭제 요청
      refetch(); // 삭제 후 목록 새로고침
    }
  };

  //noticeId를 detailpopup에 넘겨 fetch해올수있게하는 함수
  const handleNoticeClick = async (noticeId: number) => {
    setIsDetailPopupOpen(true);
    await fetchNoticeDetail(noticeId);
  };

  const handleEditClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsEditPopupOpen(true);
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
      {error && <p className='text-red mb-4'>{error}</p>}
      <table className='w-full'>
        <thead>
          <tr>
            <th className='border-b border-gray-400 p-2 text-center'>제목</th>
            <th className='border-b border-gray-400 p-2 text-center'>내용</th>
            <th className='border-b border-gray-400 p-2 text-center w-1/6'>
              작업
            </th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice: Notice) => (
            <tr
              key={notice.NOTICE_IDX}
              className='hover:bg-gray-100 transition-colors text-center'
              onClick={() => handleNoticeClick(notice.NOTICE_IDX)}
            >
              <td className='border-b border-gray-400 p-2 cursor-pointer'>
                {notice.NOTICE_SUBJ}
              </td>
              <td className='border-b border-gray-400 p-2 cursor-pointer'>
                {notice.NOTICE_CONT}
              </td>
              <td className='border-b border-gray-400 p-2'>
                <div className='flex justify-center gap-2'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent table row click
                      handleEditClick(notice);
                    }}
                    className='bg-modify text-white p-1 rounded hover:bg-modify-hover px-5 btn-shadow'
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(notice.NOTICE_IDX)} // 삭제 처리
                    className={`bg-negative text-white p-1 rounded px-5 btn-shadow ${
                      isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isDeleting} // 삭제 중 버튼 비활성화
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex mt-5 justify-end'>
        <button
          onClick={() => setIsPopupOpen(true)}
          className='bg-positive text-white p-2 rounded w-1/8 hover:bg-positive-hover btn-shadow'
        >
          공지사항 추가
        </button>
      </div>
      <NoticeAddPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <NoticeDetailPopup
        isOpen={isDetailPopupOpen}
        notice={noticeDetail}
        onClose={() => setIsDetailPopupOpen(false)}
        isLoading={isFetchingDetail}
        error={detailError}
      />
      <NoticeEditPopup
        isOpen={isEditPopupOpen}
        notice={selectedNotice}
        onClose={() => setIsEditPopupOpen(false)}
        onSave={refetch}
      />
    </div>
  );
}

export default NoticeList;
