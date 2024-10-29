import { useState, useEffect } from 'react';

interface EditNoticePopupProps {
  isOpen: boolean;
  notice: { id: number; title: string; content: string } | null;
  onClose: () => void;
  onSave: (updatedNotice: {
    id: number;
    title: string;
    content: string;
  }) => void;
}

function EditNoticePopup({
  isOpen,
  notice,
  onClose,
  onSave,
}: EditNoticePopupProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
    }
  }, [notice]);

  if (!isOpen || !notice) return null;

  const handleSave = () => {
    onSave({ id: notice.id, title, content });
    onClose();
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
          <button
            onClick={handleSave}
            className='bg-blue text-white p-2 rounded w-full'
          >
            저장
          </button>
          <button
            onClick={onClose}
            className='mt-2 bg-red text-white p-2 rounded w-full'
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNoticePopup;
