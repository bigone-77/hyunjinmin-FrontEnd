interface NoticePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function NoticePopup({ isOpen, onClose }: NoticePopupProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>새로운 공지사항 추가</h2>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='공지사항 제목'
            className='border p-2 rounded w-full'
          />
          <textarea
            placeholder='공지사항 내용'
            className='border p-2 rounded w-full h-24'
          />
          <button className='bg-blue text-white p-2 rounded w-full'>
            공지사항 추가
          </button>
        </div>
        <button
          onClick={onClose}
          className='mt-4 bg-red text-white p-2 rounded w-full'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default NoticePopup;
