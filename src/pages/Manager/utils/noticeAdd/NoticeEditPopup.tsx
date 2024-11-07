import { useState, useEffect } from 'react';
import { handleSaveNotice } from './NoticeFunc';
import { NoticeEditPopupProps } from './NoticeInter';

function NoticeEditPopup({
  isOpen,
  notice,
  onClose,
  onSave,
}: NoticeEditPopupProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (notice) {
      setTitle(notice.NOTICE_SUBJ);
      setContent(notice.NOTICE_CONT);
    }
  }, [notice]);

  if (!isOpen || !notice) return null;

  const handleSave = () => {
    if (notice) {
      handleSaveNotice(notice, title, content, setError, onSave, onClose);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>공지사항 수정</h2>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='공지사항 제목'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border p-2 rounded w-full'
          />
          <textarea
            placeholder='공지사항 내용'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='border p-2 rounded w-full h-24'
          />
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          <button
            onClick={handleSave}
            className='bg-save text-white p-2 rounded w-full hover:bg-save-hover btn-shadow'
          >
            저장
          </button>
          <button
            onClick={onClose}
            className='mt-2 bg-close text-white p-2 rounded w-full hover:bg-close-hover btn-shadow'
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeEditPopup;
