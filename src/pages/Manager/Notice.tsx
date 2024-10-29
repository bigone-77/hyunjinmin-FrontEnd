import { useState } from 'react';
import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import NoticePopup from '@/pages/Manager/utils/noticeAdd/NoticeAddPopup';
import NoticeSearchBar from '@/pages/Manager/utils/noticeAdd/NoticeSearchBar';
import NoticeList from '@/pages/Manager/utils/noticeAdd/NoticeList';
import NoticeDetailPopup from '@/pages/Manager/utils/noticeAdd/NoticeDetailPopup';
import EditNoticePopup from '@/pages/Manager/utils/noticeAdd/NoticeEditPopup';

function NoticePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const notices = [
    { id: 1, title: '공지사항 1', content: '첫 번째 공지사항 내용입니다.' },
    { id: 2, title: '공지사항 2', content: '두 번째 공지사항 내용입니다.' },
  ];

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    setIsDetailPopupOpen(true);
  };

  const closeDetailPopup = () => {
    setIsDetailPopupOpen(false);
    setSelectedNotice(null);
  };

  const handleEditClick = (notice) => {
    setSelectedNotice(notice);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedNotice(null);
  };

  const handleSaveEdit = (updatedNotice) => {
    console.log('저장된 공지사항:', updatedNotice);
    // 실제 공지사항 목록 업데이트 로직 추가 예정
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-100'>
        <h1 className='text-2xl font-bold mb-4'>공지사항 관리</h1>

        {/* 검색 컴포넌트 사용 */}
        <NoticeSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        {/* 공지사항 목록 컴포넌트 */}
        <NoticeList
          notices={notices}
          onNoticeClick={handleNoticeClick}
          onDeleteClick={(id) => console.log('삭제할 공지사항 ID:', id)}
          onEditClick={handleEditClick}
        />

        {/* 공지사항 추가 버튼 */}
        <div className='flex justify-end'>
          <button
            onClick={openPopup}
            className='bg-blue text-white p-2 rounded w-1/8'
          >
            공지사항 추가
          </button>
        </div>
      </div>

      {/* 공지사항 추가 팝업 */}
      <NoticePopup isOpen={isPopupOpen} onClose={closePopup} />
      {/* 공지사항 상세보기 팝업 */}
      <NoticeDetailPopup
        isOpen={isDetailPopupOpen}
        notice={selectedNotice}
        onClose={closeDetailPopup}
      />
      {/* 공지사항 수정 팝업 */}
      <EditNoticePopup
        isOpen={isEditPopupOpen}
        notice={selectedNotice}
        onClose={closeEditPopup}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default NoticePage;
