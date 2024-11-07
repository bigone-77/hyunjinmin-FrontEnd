import { useState } from 'react';
import { NoticePopupProps, Notice } from './NoticeInter';
import { submitNewNotice, handleClose } from './NoticeFunc';

function NoticeAddPopup({
  isOpen,
  onClose,
}: NoticePopupProps & { onNoticeAdd: (notice: Notice) => void }) {
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [message, setMessage] = useState('');

  const onHandleClose = () => {
    handleClose(setNoticeTitle, setNoticeContent, setMessage, onClose);
  };

  const onHandleAddNotice = () => {
    submitNewNotice(noticeTitle, noticeContent, setMessage, onHandleClose);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>새로운 공지사항 추가</h2>
        <input
          type='text'
          placeholder='공지사항 제목'
          value={noticeTitle}
          onChange={(e) => setNoticeTitle(e.target.value)}
          className='border p-2 mt-5 rounded w-full'
        />
        <textarea
          placeholder='공지사항 내용'
          value={noticeContent}
          onChange={(e) => setNoticeContent(e.target.value)}
          className='border p-2 mt-5 mb-5 rounded w-full h-24'
        />
        <button
          onClick={onHandleAddNotice}
          className='bg-positive text-white p-2 rounded w-full hover:bg-positive-hover btn-shadow'
        >
          공지사항 추가
        </button>
        {message && <p className='text-red-500 mt-2'>{message}</p>}
        <button
          onClick={onHandleClose}
          className='mt-4 bg-close text-white p-2 rounded w-full hover:bg-close-hover btn-shadow'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default NoticeAddPopup;
