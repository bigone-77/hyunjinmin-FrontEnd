import { useState, useEffect } from 'react';
import { NoticeEditPopupProps } from './NoticeInter';
import { useUpdateNotice } from '@/pages/Manager/utils/noticeAdd/hooks/useUpdateNotice';

function NoticeEditPopup({
  isOpen,
  notice,
  onClose,
  onSave,
}: NoticeEditPopupProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { updateNotice, isUpdating, error } = useUpdateNotice();

  useEffect(() => {
    if (notice) {
      setTitle(notice.NOTICE_SUBJ);
      setContent(notice.NOTICE_CONT);
    }
  }, [notice]);

  if (!isOpen || !notice) return null;

  const handleSave = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    const updatedNotice = {
      ...notice,
      NOTICE_SUBJ: title,
      NOTICE_CONT: content,
    };
    await updateNotice(updatedNotice);
    onSave(); // Refresh the list
    onClose(); // Close the popup
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
            className={`bg-save text-white p-2 rounded w-full hover:bg-save-hover btn-shadow ${
              isUpdating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? '저장 중...' : '저장'}
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
